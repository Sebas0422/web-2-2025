import { DataTypes } from 'sequelize';

const Move = (sequelize) => {
  return sequelize.define(
    'Move',
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      power: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'moves',
      timestamps: false,
    },
  );
};

export default Move;
