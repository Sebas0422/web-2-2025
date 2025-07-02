import { DataTypes } from 'sequelize';

const TeamPokemonMoves = (sequelize) => {
  return sequelize.define(
    'TeamPokemonMove',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teamPokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'team_pokemons', key: 'id' },
      },
      moveId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'moves', key: 'id' },
      },
    },
    {
      tableName: 'team_pokemon_moves',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['teamPokemonId', 'moveId'],
        },
      ],
    },
  );
};

export default TeamPokemonMoves;
