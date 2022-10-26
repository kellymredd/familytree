const { Op } = require('sequelize');
const Models = require('../../models');
const MembersService = require('./members.service');

class TreeService {
  constructor() {
    this.Models = Models;
    this.membersService = new MembersService();
  }

  async recursiveFamily({ fatherId = null, motherId = null }) {
    // get father and mother of id
    // 2 sep promises that resolve together with Promise.all
    // the father promise will resolve with his father/mother
    // and the `then` will call this same function passing his father/mother id
    // recursive happens

    // TODO: HANDLE NULL VALUES, FATHER MIGHT BE AVAILABLE BUT MOTHER MIGHT BE NULL (VICE-VERSA) AT ANY GIVEN MOMENT
    // TODO: HANDLE NULL VALUES, FATHER MIGHT BE AVAILABLE BUT MOTHER MIGHT BE NULL (VICE-VERSA) AT ANY GIVEN MOMENT
    // TODO: HANDLE NULL VALUES, FATHER MIGHT BE AVAILABLE BUT MOTHER MIGHT BE NULL (VICE-VERSA) AT ANY GIVEN MOMENT
    // TODO: HANDLE NULL VALUES, FATHER MIGHT BE AVAILABLE BUT MOTHER MIGHT BE NULL (VICE-VERSA) AT ANY GIVEN MOMENT
    // TODO: HANDLE NULL VALUES, FATHER MIGHT BE AVAILABLE BUT MOTHER MIGHT BE NULL (VICE-VERSA) AT ANY GIVEN MOMENT
    // TODO: HANDLE NULL VALUES, FATHER MIGHT BE AVAILABLE BUT MOTHER MIGHT BE NULL (VICE-VERSA) AT ANY GIVEN MOMENT
    // TODO: HANDLE NULL VALUES, FATHER MIGHT BE AVAILABLE BUT MOTHER MIGHT BE NULL (VICE-VERSA) AT ANY GIVEN MOMENT
    // TODO: HANDLE NULL VALUES, FATHER MIGHT BE AVAILABLE BUT MOTHER MIGHT BE NULL (VICE-VERSA) AT ANY GIVEN MOMENT

    const father = this.Models.member.findByPk(fatherId, {
      include: [
        {
          model: this.Models.relation,
          attributes: ['relatedId', 'type'],
          //   where: { [Op.and]: [{ type: 'parent' }] },
          where: { type: 'parent' },
        },
      ],
    });

    const mother = this.Models.member.findByPk(motherId, {
      include: [
        {
          model: this.Models.relation,
          attributes: ['relatedId', 'type'],
          //   where: { [Op.and]: [{ type: 'parent' }] },
          where: { type: 'parent' },
        },
      ],
    });

    // i think this was a road block in the old attempt, it didn't recurse correctly
    // at what point do we get children/sibings?
    // could combine the two into one object but will be building inwards and downwards 0_o
    // maybe this could be called by a 'getParents' function, then once it resolves and finishes
    // we could call a 'getChildren' function. Order parents/couples by relation and then shove kids in there
    return Promise.all([father, mother]).then((parents) => {
      //   console.log(
      //     parents[0].relations[0].relatedId,
      //     parents[0].relations[1].relatedId
      //   );
      return this.recursiveFamily({
        fatherId: parents[0]?.relations[0]?.relatedId,
        motherId: parents[0]?.relations[1]?.relatedId,
      });
    });
  }

  async list() {
    //const rootPerson = { id: 1 }; // me
    //const rootSpouse = { id: 35 }; // don't display spouse family, only `rootPerson` direct kin

    try {
      const parents = await this.recursiveFamily({
        fatherId: 48,
        motherId: 52,
      });

      // then get spouse

      console.log(parents);

      return parents;
    } catch (error) {
      return error;
    }

    //     try {
    //       //   const rootMember = await this.Models.member.findByPk(rootPerson.id, {
    //       const parents = await this.Models.member.findAll({
    //         include: [
    //           {
    //             model: this.Models.relation,
    //             attributes: ['relatedId', 'type'],
    //             as: 'parents',
    //             where: { [Op.and]: [{ type: 'parent' }] },
    //           },
    //         ],
    //       });

    //       const parsedMember = rootMember.toJSON();
    //       const parentIds = parsedMember.relations.map((rel) => {
    //         if (rel.type === 'parent') {
    //           return rel.relatedId;
    //         }
    //       });

    //       // need new method, `getRelatedMembers` fetches events and we don't need them
    //       const relMembersProm = this.membersHelper.getRelatedMembers(parsedMember);
    //       // siblings are computed, not stored
    //       const relSibsProm = this.membersHelper.getRelatedSiblings(
    //         parentIds,
    //         rootPerson.id
    //       );

    //       const allRelatedMembers = await Promise.all([
    //         ...relMembersProm,
    //         relSibsProm,
    //       ]).then((promises) => {
    //         const sibs = promises.pop();
    //         return [...promises, ...sibs];
    //       });

    //       // grab kids and shove them under the context member's spouse
    //       const relations = await this.membersHelper.groupSpousesAndChildren(
    //         allRelatedMembers
    //       );

    //       return {
    //         ...rootPerson.toJSON(),
    //         relations,
    //       };
    //     } catch (error) {
    //       return error;
    //     }
  }
}

module.exports = TreeService;
