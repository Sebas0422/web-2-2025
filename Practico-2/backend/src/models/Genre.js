import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'Genre',
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
      imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'genres',
      timestamps: false,
    },
  );
};
