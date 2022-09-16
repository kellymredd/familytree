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
      const parentIds = parsedMember.relations.map((rel) => {
        if (rel.type === "parent") {
          return rel.relatedId;
        }
      });

      const relatedMembersPromise =
        this.membersHelper.getRelatedMembers(parsedMember);
      // siblings are computed, not stored
      const relatedSiblingsPromise = this.membersHelper.getRelatedSiblings(
        parentIds,
        id
      );

      const allRelatedMembers = await Promise.all([
        ...relatedMembersPromise,
        relatedSiblingsPromise,
      ]).then((promises) => {
        const sibs = promises.pop();
        return [...promises, ...sibs];
      });

      // grab kids and shove them under the context member's spouse
      const children = allRelatedMembers.filter((arm) => arm.type === "child");
      const spouses = allRelatedMembers.filter((arm) => arm.type === "spouse");
      const filteredMembers = allRelatedMembers.filter(
        (arm) => arm.type !== "child" && arm.type !== "spouse"
      );
      const groupedSpouses = spouses.map((spouse) => {
        const spouseChildren = children
          .map((child) => {
            const { relations, ...childParts } = child;
            const poop = relations
              ?.map((rel) => {
                if (rel.type === "parent" && rel.relatedId === spouse.id) {
                  return childParts;
                }

                return null;
              })
              .filter((n) => Boolean(n));
            return poop.length ? { ...poop[0] } : null;
          })
          .filter((n) => Boolean(n));

        return {
          ...spouse,
          spouseChildren,
        };
      });

      return {
        ...member.toJSON(),
        relations: [...filteredMembers, ...groupedSpouses],
      };
    } catch (error) {
      return error;
    }
  }

  async createMember(req) {
    const {
      memberType,
      contextMember,
      type,
      parents,
      newRelations,
      spouseId,
      ...rest
    } = req;

    try {
      const member = await this.Models.member.create(rest);
      let newRelationsPromise = Promise.resolve([]);

      // create parent relations
      if (newRelations?.length) {
        newRelationsPromise = newRelations.map(async (newRelation) =>
          this.membersHelper.createRelations({
            ...newRelation,
            [newRelation["nullColumn"]]: member.id,
          })
        );
      }

      await Promise.all([...newRelationsPromise]);

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
