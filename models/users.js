module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    id: { type: DataTypes.INTEGER(11), autoIncrement: true, primaryKey: true },
    userName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    // refreshToken: { type: DataTypes.STRING, allowNull: false },
  });

  return users;
};
