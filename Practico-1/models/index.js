const { sequelize } = require("../config/db.config");

const Burger = require("./burger")(sequelize);
const Restaurant = require("./restaurant")(sequelize);
const Rating = require("./rating")(sequelize);

Restaurant.hasMany(Burger, { foreignKey: "restaurantId", as: "burgers" });
Burger.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurants" });
Burger.hasMany(Rating, { foreignKey: 'burgerId' });
Rating.belongsTo(Burger, { foreignKey: 'burgerId' });

module.exports = {
  Burger,
	Restaurant,
	Rating,
  sequelize,
  Sequelize: sequelize.Sequelize,
};
