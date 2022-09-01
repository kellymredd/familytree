const Models = require("../../../models");
const {
  sequelize: { Op },
} = require("../../../models");

class MembersHelperService {
  constructor() {
    this.Models = Models;
  }

  async createSpouses(spouseArray) {
    const spouses = spouseArray.map((s) =>
      this.Models.relation.create({
        type: "spouse",
        relatedId: s.s1,
        memberId: s.s2,
      })
    );

    return Promise.all(...spouses);
  }

  async createKidsParentRelation(contextMember, member) {
    // create new kid/parent relationships
    // find all the kids who are related to the pre-existing parent

    // todo: find using member model with relation include
    // b/c you have to create FK using member instance
    const contextMemberKids = await this.Models.member.findAll({
      where: {
        include: this.Models.relation,
        where: {
          [Op.and]: [{ type: "parent" }, { relatedId: contextMember.id }],
        },
        // [Op.and]: [{ type: "parent" }, { relatedId: contextMember.id }],
      },
    });

    // then associate them with the newly created spouse
    if (contextMemberKids.length) {
      const promises = contextMemberKids.map((kid) =>
        kid.createRelation({
          type: "parent",
          relatedId: member.id,
          memberId: kid.id,
        })
      );

      return Promise.all([...promises]);
    }

    return Promise.resolve(true);
  }

  async createKidParentRelation(contextMember, member) {
    // create new rows in Relations table b/n a single kid and this new parent/spouse
    // then associate them with the newly created spouse/parent
    this.Models.relation.create({
      type: "parent",
      relatedId: member.id,
      memberId: contextMember.id,
    });
  }
}

module.exports = MembersHelperService;
