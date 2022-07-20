module.exports = (sequelize, DataTypes) => {
  const members = sequelize.define("members", {
    id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    familyBranchId: { type: DataTypes.INTEGER(11) },
    dateOfBirth: { type: DataTypes.DATE },
    dateOfDeath: { type: DataTypes.DATE },
    fatherId: { type: DataTypes.INTEGER },
    firstName: { type: DataTypes.STRING },
    gender: { type: DataTypes.INTEGER },
    lastName: { type: DataTypes.STRING },
    maidenName: { type: DataTypes.STRING },
    middleName: { type: DataTypes.STRING },
    motherId: { type: DataTypes.INTEGER },
    spouseId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },
    suffix: { type: DataTypes.INTEGER },
  });

  return members;
};
