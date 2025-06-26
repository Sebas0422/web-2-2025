import { DataTypes } from 'sequelize';
const Teams = (sequelize) => {
  return sequelize.define(
    'Team',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'teams',
      timestamps: true,
    },
  );
};

export default Teams;
