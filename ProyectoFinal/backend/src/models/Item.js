import { DataTypes } from 'sequelize';

const Item = (sequelize) => {
  return sequelize.define(
    'Item',
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
        allowNull: true,
      },
      imagePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'items',
      timestamps: false,
    },
  );
};

export default Item;
