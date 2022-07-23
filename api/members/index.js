const express = require("express");
const memberRouter = express.Router();
const {
  members,
  Sequelize: { Op },
} = require("../../models");

memberRouter.get("/members", async (req, res, next) => {
  members
    .findAll()
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
});

memberRouter.get("/member/:id", async (req, res, next) => {
  const member = await members
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .catch((err) => console.log(err));

  const resp = member.toJSON();

  if (resp.id) {
    const parents = members.findAll({
      where: {
        id: [resp.motherId, resp.fatherId],
      },
    });

    const siblings = members.findAll({
      where: {
        // maybe expand this to also check .motherId?
        fatherId: resp.fatherId ?? 0, // if `fatherId` is null use 0 since it will never find anything.
      },
    });

    const spouse = members.findAll({
      where: {
        id: resp.spouseId,
      },
    });

    const children = members.findAll({
      where: {
        [Op.or]: [{ fatherId: resp.id }, { motherId: resp.id }],
      },
    });

    const family = await Promise.all([parents, siblings, spouse, children]);

    res.send({
      ...resp,
      parents: family[0],
      siblings: family[1],
      spouse: family[2],
      children: family[3],
    });
  }

  return resp;
});

memberRouter.get("/member/:id/edit", async (req, res, next) => {
  await members
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
});

memberRouter.put("/member/:id", async (req, res, next) => {
  members
    .update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
});

memberRouter.post("/member", async (req, res, next) => {
  const { memberType, contextMember, type, parents, ...rest } = req.body;

  // POST new member
  const member = await members.create(rest).catch((err) => console.log(err));
  const resp = member.toJSON();

  // Update family accordingly
  if (resp.id && contextMember) {
    const { id, gender } = resp;

    if (memberType.toLowerCase() === "spouse") {
      // Update Spouse column of Context Member
      const updateSpouse = members
        .update(
          { spouseId: id },
          {
            where: {
              id: contextMember.id,
            },
          }
        )
        .catch((err) => console.log(err));

      const target = gender === 2 ? "fatherId" : "motherId";
      const source = gender === 2 ? "motherId" : "fatherId";
      const updateKids = members
        .update(
          { [target]: id },
          {
            where: {
              [source]: contextMember.id,
            },
          }
        )
        .catch((err) => console.log(err));

      await Promise.all([updateSpouse, updateKids]);
    } else if (memberType.toLowerCase() === "parents") {
      // if 0 parents we know they have no siblings yet
      //(ie: business rule says you can't add siblings w/o at least 1 parent)
      const parentColumn = gender === 2 ? "fatherId" : "motherId";
      if (!contextMember.parents.length) {
        //Why not update all the siblilngs here? why leave them out just b/c they don't have any yet?
        // we are creating a new parent in the context of one of their existing children
        // so update this existing child's db record with their father/mother id
        await members
          .update(
            { [parentColumn]: id },
            {
              where: {
                id: contextMember.id,
              },
            }
          )
          .catch((err) => console.log(err));
      } else {
        // update all contextMember's siblings db records with their father/mother id

        // We get the new Parent's gender to determine if the
        // existing parent is mom(1) or dad(2) then update accordingly
        const target = gender === 2 ? "fatherId" : "motherId";
        const source = gender === 2 ? "motherId" : "fatherId";

        await members
          .update(
            { [target]: id },
            {
              where: {
                [source]: contextMember[source],
              },
            }
          )
          .catch((err) => console.log(err));
      }

      // if contextMember only has 1 parent (ie, a child),
      // then update that 1 parent's db record with this new member as their spouse
      if (contextMember?.parents?.length === 1) {
        const genderType = gender === 1 ? "fatherId" : "motherId";
        await members
          .update(
            { spouseId: id },
            {
              where: {
                id: contextMember[genderType],
              },
            }
          )
          .catch((err) => console.log("saving spouse of parent: ", err));
      }
    }

    return res.send(resp);
  }

  return res.send(resp);
});

module.exports = memberRouter;
