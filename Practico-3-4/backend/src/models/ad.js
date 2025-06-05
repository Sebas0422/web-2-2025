import { DataTypes } from "sequelize";

const Ad = (sequelize) => (
    sequelize.define("Ad", {
    type: {
      type: DataTypes.ENUM("buy", "sell"),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })
)

export default Ad;