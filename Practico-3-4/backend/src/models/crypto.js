import { DataTypes } from "sequelize";

export const Crypto = (sequelize) => (
  sequelize.define("Crypto", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    usdCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  })
);
export default Crypto;