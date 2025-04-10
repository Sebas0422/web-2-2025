const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Burger = sequelize.define(
    'Burger',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },
    },
    {
      tableName: 'burgers',
      timestamps: false,
    }
  )
  return Burger;
}