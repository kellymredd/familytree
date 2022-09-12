const Models = require("../../models");
const MembersHelperService = require("./helpers/members.helper");

class MemberService {
  constructor() {
    this.Models = Models;
    this.membersHelper = new MembersHelperService();
  }

  async listMembers() {
    // look into `findAndCountAll` for pagination
    try {
      const data = await this.Models.member.findAll({
        order: [["lastName", "DESC"]],
        limit: 100,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async getMember(id) {
    try {
      const member = await this.Models.member.findOne({
        where: { id },
        include: [
          {
            model: this.Models.relation,
            attributes: ["relatedId", "type"],
          },
          {
            model: this.Models.event,
          },
        ],
      });

      const parsedMember = member.toJSON();
      const relatedMembersPromise = parsedMember.relations.map((relation) => {
        return this.Models.member
          .findByPk(relation.relatedId, {
            // lighten the load
            attributes: [
              "id",
              "firstName",
              "middleName",
              "maidenName",
              "lastName",
              "lastName",
              "suffix",
            ],
          })
          .then((rel) => ({ ...rel.toJSON(), type: relation.type }));
      });

      // how to compute siblings? pull out parent rows and then fetch??
      // Get all child types: SELECT * FROM relations WHERE type = 'child' && relatedId = 'my parent id' OR 'my other parent id'
      // Get the actual member data: SELECT * FROM members WHERE type = 'child'

      const relatedMembers = await Promise.all([...relatedMembersPromise]);

      return { ...member.toJSON(), relations: relatedMembers };
    } catch (error) {
      return error;
    }
  }

  async createMember(req) {
    const { memberType, contextMember, type, parents, newRelations, ...rest } =
      req;
    try {
      const member = await this.Models.member.create(rest);

      if (newRelations?.length) {
        const promises = newRelations.map(async (newRelation) =>
          this.membersHelper.createRelations({
            ...newRelation,
            [newRelation["nullColumn"]]: member.id,
          })
        );

        await Promise.all(promises);

        return member;
      }

      return member;
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
}

module.exports = MemberService;
