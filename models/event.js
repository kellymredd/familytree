module.exports = (sequelize, DataTypes) => {
  function convertINTS({ context, columnName }) {
    const rawValue = context.getDataValue(columnName);
    return rawValue ? rawValue.toString() : null;
  }

  const Events = sequelize.define(
    'event',
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: DataTypes.INTEGER,
        get() {
          return convertINTS({ context: this, columnName: 'city' });
        },
      },
      country: {
        type: DataTypes.INTEGER,
        get() {
          return convertINTS({ context: this, columnName: 'country' });
        },
      },
      county: {
        type: DataTypes.INTEGER,
        get() {
          return convertINTS({ context: this, columnName: 'county' });
        },
      },
      dateOfEvent: { type: DataTypes.DATEONLY },
      stateProvince: {
        type: DataTypes.INTEGER,
        get() {
          return convertINTS({ context: this, columnName: 'stateProvince' });
        },
      },
      typeOfEvent: {
        type: DataTypes.INTEGER,
        get() {
          return convertINTS({ context: this, columnName: 'typeOfEvent' });
        },
      },
    },
    {
      timestamps: false,
    }
  );

  Events.associate = (models) => {
    Events.belongsTo(models.member);
  };

  return Events;
};
