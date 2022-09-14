const Models = require("../../../models");
const { Op } = require("sequelize");

class MembersHelperService {
  constructor() {
    this.Models = Models;
  }

  async createRelations(relation) {
    const relations = await this.Models.relation.create(relation);
    return relations;
  }

  getRelatedMembers(parsedMember) {
    return parsedMember.relations.map(async (relation) => {
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
  }

  async getRelatedSiblings(parentIds, id) {
    const siblingMembers = await this.Models.relation.findAll({
      where: {
        type: "parent",
        [Op.and]: {
          relatedId: parentIds,
        },
        [Op.not]: {
          memberId: id,
        },
      },
      attributes: [],
      include: [
        {
          model: this.Models.member,
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
        },
      ],
    });

    const plainMembers = siblingMembers.map((sm) => sm.get({ plain: true }));

    return [
      ...new Map(
        plainMembers.map(({ member }) => [
          member.id,
          { ...member, type: "sibling" },
        ])
      ).values(),
    ];
  }
}

module.exports = MembersHelperService;
