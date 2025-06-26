import { DataTypes } from 'sequelize';

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
          model: 'types', // Name of the referenced table
          key: 'id', // Key in the referenced table
        },
      },
      baseHp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      baseAttack: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      baseDefense: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      baseSpAttack: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      baseSpDefense: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      baseSpeed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'pokemons',
      timestamps: false,
    },
  );
};

export default Pokemon;
