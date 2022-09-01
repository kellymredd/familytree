const Models = require("../../models");
// const {
//   sequelize: { Op },
// } = require("../../../models");
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

      const relatedMembers = await Promise.all([...relatedMembersPromise]);

      return { ...member.toJSON(), relations: relatedMembers };
    } catch (error) {
      return error;
    }
  }

  async createMember(req) {
    const { memberType, contextMember, type, parents, ...rest } = req;
    try {
      const member = await this.Models.member.create(
        {
          ...rest,
          relation: [
            [
              { relatedId: contextMember.id, memberId: member.id },
              { relatedId: member.id, memberId: contextMember.id },
            ],
          ],
        },
        {
          include: [this.Models.member],
        }
      );

      // create row in Relations table for spouse
      if (memberType.toLowerCase() === "spouse") {
        // await this.membersHelper.createSpouses([
        //   { s1: contextMember.id, s2: member.id },
        //   { s1: member.id, s2: contextMember.id },
        // ]);

        // create rows in Relations table for kids/parent
        // todo: TEST THIS
        // await this.membersHelper.createKidsParentRelation(
        //   contextMember,
        //   member
        // );

        return member;
      } else if (memberType.toLowerCase() === "parents") {
        // if a child is adding the first parent, add a single one-to-one relation
        // else, a child is adding the second parent, update all the kids
        // if child is adding the second parent, update spouses (can't assume this new parent is a current spouse)
        await this.membersHelper[
          contextMember?.parents.length === 0
            ? createKidParentRelation
            : createKidParentsRelation
        ](contextMember, member);

        if (contextMember?.parents?.length === 1) {
          // create spouse
        }
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
