import { DataTypes } from 'sequelize';

const TeamPokemonMoves = (sequelize) => {
  return sequelize.define(
    'TeamPokemonMove',
    {
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
      slot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'team_pokemon_moves',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['teamPokemonId', 'slot'],
        },
      ],
    },
  );
};

export default TeamPokemonMoves;
