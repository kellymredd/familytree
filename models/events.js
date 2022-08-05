module.exports = (sequelize, DataTypes) => {
  function convertINTS({ context, columnName }) {
    const rawValue = context.getDataValue(columnName);
    return rawValue ? rawValue.toString() : null;
  }

  const events = sequelize.define("events", {
    id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    city: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "city" });
      },
    },
    country: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "country" });
      },
    },
    county: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "county" });
      },
    },
    dateOfEvent: { type: DataTypes.DATEONLY },
    memberId: {
      type: DataTypes.INTEGER,
    },
    stateProvince: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "stateProvince" });
      },
    },
    typeOfEvent: {
      type: DataTypes.INTEGER,
      get() {
        return convertINTS({ context: this, columnName: "typeOfEvent" });
      },
    },
  });

  return events;
};
