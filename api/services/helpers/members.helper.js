const { Op } = require('sequelize');
const Models = require('../../../models');

class MembersHelperService {
  constructor() {
    this.Models = Models;
  }

  async createRelations(relation) {
    const relations = await this.Models.relation.create(relation);
    return relations;
  }

  getRelatedMembers(parsedMember) {
    return parsedMember.relations.map(async (relation) => this.Models.member
      .findByPk(relation.relatedId, {
        // lighten the load
        attributes: [
          'id',
          'firstName',
          'middleName',
          'maidenName',
          'lastName',
          'lastName',
          'suffix',
        ],
        include: [
          {
            model: this.Models.relation,
            attributes: ['relatedId', 'type'],
          },
        ],
      })
      .then((rel) => ({
        ...rel.toJSON(),
        type: relation.type,
      })));
  }

  async getRelatedSiblings(parentIds, id) {
    const siblingMembers = await this.Models.relation.findAll({
      where: {
        type: 'parent',
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
            'id',
            'firstName',
            'middleName',
            'maidenName',
            'lastName',
            'lastName',
            'suffix',
          ],
        },
      ],
    });

    const plainMembers = siblingMembers.map((sm) => sm.get({ plain: true }));

    return [
      ...new Map(
        plainMembers.map(({ member }) => [
          member.id,
          { ...member, type: 'siblings' },
        ]),
      ).values(),
    ];
  }

  async groupSpousesAndChildren(allRelatedMembers) {
    const children = allRelatedMembers.filter((arm) => arm.type === 'child');
    const spouses = allRelatedMembers.filter((arm) => arm.type === 'spouse');
    // All others that aren't children or spouses
    const filteredMembers = allRelatedMembers.filter(
      (arm) => arm.type !== 'spouse',
    );
    const groupedSpouses = spouses.map((spouse) => {
      const spouseChildren = children
        .map((child) => {
          const { relations, ...childParts } = child;
          const matched = relations
            ?.map((rel) => {
              if (rel.type === 'parent' && rel.relatedId === spouse.id) {
                return childParts;
              }

              return null;
            })
            .filter((n) => Boolean(n));
          return matched.length ? { ...matched[0] } : null;
        })
        .filter((n) => Boolean(n));

      return {
        ...spouse,
        spouseChildren,
      };
    });

    return [...filteredMembers, ...groupedSpouses];
  }
}

module.exports = MembersHelperService;
