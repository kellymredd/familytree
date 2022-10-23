const Models = require('../../models');
const MembersHelperService = require('./helpers/members.helper');

class MemberService {
  constructor() {
    this.Models = Models;
    this.membersHelper = new MembersHelperService();
  }

  async listMembers() {
    // look into `findAndCountAll` for pagination
    try {
      const data = await this.Models.member.findAndCountAll({
        order: [
          ['lastName', 'ASC'],
          ['firstName', 'ASC'],
        ],
        //limit: 100,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  // endpoint for 'selecting existing member' on Member Form
  async selectMembers() {
    try {
      const data = await this.Models.member.findAll({
        order: [['lastName', 'ASC']],
        attributes: ['lastName', 'firstName', 'middleName', 'id'],
        // limit: 100,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async getMember(id) {
    try {
      const member = await this.Models.member.findByPk(id, {
        include: [
          {
            model: this.Models.relation,
            attributes: ['relatedId', 'type'],
          },
          {
            model: this.Models.event,
          },
        ],
      });

      const parsedMember = member.toJSON();
      const parentIds = parsedMember.relations.map((rel) => {
        if (rel.type === 'parent') {
          return rel.relatedId;
        }
      });

      const relMembersProm = this.membersHelper.getRelatedMembers(parsedMember);
      // siblings are computed, not stored
      const relSibsProm = this.membersHelper.getRelatedSiblings(parentIds, id);

      const allRelatedMembers = await Promise.all([
        ...relMembersProm,
        relSibsProm,
      ]).then((promises) => {
        const sibs = promises.pop();
        return [...promises, ...sibs];
      });

      // grab kids and shove them under the context member's spouse
      const relations = await this.membersHelper.groupSpousesAndChildren(
        allRelatedMembers
      );

      return {
        ...member.toJSON(),
        relations,
      };
    } catch (error) {
      return error;
    }
  }

  async editMember(id) {
    try {
      return await this.Models.member.findByPk(id);
    } catch (error) {
      return error;
    }
  }

  async createMember(req) {
    const { newRelations, existingMember, ...rest } = req;

    try {
      let member = null;
      let newRelationsPromise = Promise.resolve([]);

      // Sometimes we are create a new member and sometimes we are selecting an existing member
      // if `existingMember` we skip creating a new member and move on to creating relations using it's value
      if (!existingMember) {
        member = await this.Models.member.create(rest);
      }

      // create parent relations
      if (newRelations?.length) {
        newRelationsPromise = newRelations.map(async (newRelation) => {
          if (existingMember) {
            this.membersHelper.createRelations(newRelation);
          } else {
            this.membersHelper.createRelations({
              ...newRelation,
              [newRelation.nullColumn]: member?.id,
            });
          }
        });
      }

      await Promise.all([...newRelationsPromise]);

      return member; // make sure we return all new relations so the UI will update
    } catch (error) {
      return error;
    }
  }

  async updateMember(req) {
    try {
      const member = await this.Models.member.findOne({
        where: { id: req.params.id },
      });

      const updatedMember = await member.update(req.body);
      // destroy existing (not sure if this is applicable, rn)
      //   const forDestroy = await member.getRelations();
      //   await Promise.all(forDestroy.map((relation) => relation.destroy()));

      return updatedMember;
    } catch (error) {
      return error;
    }
  }

  async deleteMember(id) {
    try {
      const data = await this.Models.member.destroy({
        where: {
          id,
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async unassociateMember(relations) {
    const unassocPromise = relations.map(async (relation) =>
      this.membersHelper.deleteRelations(relation)
    );

    await Promise.all([...unassocPromise]);
  }
}

module.exports = MemberService;
