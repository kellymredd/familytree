const { members } = require("../../models");

const MemberService = require("../services/members.service");
const membersService = new MemberService();

const listMembers = async (req, res, next) => {
  const members = await membersService.listMembers();

  return res.status(200).send(members);
};

// GET member profile with family
const viewMember = async (req, res, next) => {
  const member = await membersService.getMember(req.params.id);

  return res.status(200).send(member);
};

// GET member profile information for editing
const editMember = async (req, res, next) => {
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
};

const putMember = async (req, res, next) => {
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
};

const createMember = async (req, res, next) => {
  const member = membersService.createMember(req.body);

  return res.status(200).send(member);
};

const deleteMember = async (req, res, next) => {
  members
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  listMembers,
  viewMember,
  editMember,
  putMember,
  deleteMember,
  createMember,
};
