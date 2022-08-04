module.exports = (sequelize, DataTypes) => {
  function convertINTS({ context, columnName }) {
    const rawValue = context.getDataValue(columnName);
    return rawValue ? rawValue.toString() : null;
  }

  const members = sequelize.define("members", {
    id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    familyBranchId: { type: DataTypes.INTEGER(11) },
    dateOfBirth: { type: DataTypes.DATE },
    dateOfDeath: { type: DataTypes.DATE },
    fatherId: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "fatherId" });
      },
    },
    firstName: { type: DataTypes.STRING },
    gender: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "gender" });
      },
    },
    lastName: { type: DataTypes.STRING },
    maidenName: { type: DataTypes.STRING },
    middleName: { type: DataTypes.STRING },
    motherId: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "motherId" });
      },
    },
    spouseId: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "spouseId" });
      },
    },
    status: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "status" });
      },
    },
    suffix: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "suffix" });
      },
    },
  });

  return members;
};
