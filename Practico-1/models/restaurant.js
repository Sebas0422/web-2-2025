const {DataTypes}= require('sequelize')

module.exports = (sequelize) => {
  const Restaurant = sequelize.define(
    'Restaurant',
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
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: 'restaurants',
      timestamps: false,
    }
  )
  return Restaurant;
}