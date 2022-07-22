module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define("events", {
    id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    city: { type: DataTypes.INTEGER },
    country: { type: DataTypes.INTEGER },
    county: { type: DataTypes.INTEGER },
    dateOfEvent: { type: DataTypes.DATEONLY },
    memberId: { type: DataTypes.INTEGER },
    stateProvince: { type: DataTypes.INTEGER },
    typeOfEvent: { type: DataTypes.INTEGER },
  });

  return events;
};
