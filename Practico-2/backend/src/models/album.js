import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'Album',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverImagePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'artists',
          key: 'id',
        },
      },
    },
    {
      tableName: 'albums',
      timestamps: false,
    },
  );
};
