import { DataTypes } from 'sequelize';

const Nature = (sequelize) => {
  return sequelize.define(
    'Nature',
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
      increasedStat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      decreasedStat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'natures',
      timestamps: false,
    },
  );
};

export default Nature;
