const { sequelize } = require("../config/db.config");

const burger = require("./burger")(sequelize);
const Restaurant = require("./restaurant")(sequelize);

Restaurant.hasMany(burger, { foreignKey: "restaurantId", as: "burgers" });
burger.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurants" });

module.exports = {
  burger,
	Restaurant,
  sequelize,
  Sequelize: sequelize.Sequelize,
};
