/**
 * DEPRECATED NOT USED
 */

module.exports = (sequelize, DataTypes) => {
  const MemberRelations = sequelize.define(
    'memberRelations',
    {
      memberId: DataTypes.INTEGER,
      relationId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  return MemberRelations;
};
