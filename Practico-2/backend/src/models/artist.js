import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'Artist',
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
      photoPath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'genres',
          key: 'id',
        },
      },
    },
    {
      tableName: 'artists',
      timestamps: false,
    },
  );
};
