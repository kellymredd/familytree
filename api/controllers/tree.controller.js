// const { members } = require('../../models');
const TreeService = require('../services/tree.service');
const treeService = new TreeService();

const list = async (req, res /*next*/) => {
  const tree = await treeService.list(); // eventually send rootperson.id

  return res.status(200).send(tree);
};

module.exports = {
  list,
};
