import { DataTypes } from 'sequelize';
import { EntityTypes } from '../types/EntityTypes.js';

const Pokemon = (sequelize) => {
  return sequelize.define(
    'Pokemon',
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
      imagePatch: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: EntityTypes.Types,
          key: 'id',
        },
      },
      baseHp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      baseAttack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      baseDefense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      baseSpAttack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      baseSpDefense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      baseSpeed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'pokemons',
      timestamps: false,
    },
  );
};

export default Pokemon;
