// const { Op } = require('sequelize');
const Models = require('../../models');
const MembersService = require('./members.service');

class TreeService {
  constructor() {
    this.Models = Models;
    this.membersService = new MembersService();
    this.totalParents = [];
  }

  async recursiveFamily({ id }) {
    const member = !id
      ? await Promise.resolve({})
      : await this.Models.member.findByPk(id, {
          include: [
            {
              model: this.Models.relation,
              attributes: ['relatedId', 'type'],
            },
          ],
        });

    const parsedMember = member.toJSON();
    // const allowRecursion = !!parsedMember?.relations?.length;

    // console.log(allowRecursion, parsedMember.id);

    this.totalParents.push(parsedMember);

    const parentIds = parsedMember.relations
      .map((rel) => {
        if (rel.type === 'parent') {
          return rel.relatedId;
        }
      })
      .filter((pi) => pi);

    // recurse with parent ids
    // console.log(parentIds);

    // maybe some kinda of while... loop to count backwards so nothing can return until 0?

    if (parentIds.length) {
      // this is a false positive b/c they can have relatives but no parents and that is what we are after, we check too late
      return await parentIds.map((rel) => {
        //if (rel.type === 'parent') {
        return this.recursiveFamily({
          id: rel,
        });
        //}
      });
    } else {
      console.log('this.totalParents');
      return this.totalParents;
    }

    // this.totalParents.push(parsedMember);

    // return this.totalParents;
  }

  async list() {
    //const rootPerson = { id: 1 }; // me

    try {
      await this.recursiveFamily({ id: 1 });

      //   console.log(poop);
      console.log(this.totalParents.length);

      return this.totalParents;
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
