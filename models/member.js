module.exports = (sequelize, DataTypes) => {
  function convertINTS({ context, columnName }) {
    const rawValue = context.getDataValue(columnName);
    return rawValue ? rawValue.toString() : null;
  }

  const Member = sequelize.define(
    'member',
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      familyBranchId: { type: DataTypes.INTEGER(11) },
      dateOfBirth: { type: DataTypes.DATEONLY },
      dateOfDeath: { type: DataTypes.DATEONLY },
      firstName: { type: DataTypes.STRING },
      gender: {
        type: DataTypes.INTEGER,
        get() {
          return convertINTS({ context: this, columnName: 'gender' });
        },
      },
      lastName: { type: DataTypes.STRING },
      maidenName: { type: DataTypes.STRING },
      middleName: { type: DataTypes.STRING },
      status: {
        type: DataTypes.INTEGER,
        get() {
          return convertINTS({ context: this, columnName: 'status' });
        },
      },
      suffix: {
        type: DataTypes.INTEGER,
        get() {
          return convertINTS({ context: this, columnName: 'suffix' });
        },
      },
    },
    {
      timestamps: false,
    }
  );

  Member.associate = (models) => {
    Member.hasMany(models.relation, { onDelete: 'cascade' });
    Member.hasMany(models.event, { onDelete: 'cascade' });
  };

  return Member;
};
