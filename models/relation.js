module.exports = (sequelize, DataTypes) => {
  const Relation = sequelize.define(
    'relation',
    {
      type: { type: DataTypes.STRING },
      relatedId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    },
  );

  Relation.associate = (models) => {
    Relation.belongsTo(models.member);
    // Relation.belongsToMany(models.member, { through: "MemberRelations" });
  };

  return Relation;
};
