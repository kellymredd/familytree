module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("user", {
    id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    userName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  });

  return Users;
};
