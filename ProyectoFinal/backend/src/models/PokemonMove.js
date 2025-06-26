const PokemonMove = (sequelize) => {
  return sequelize.define(
    'PokemonMove',
    {
      id: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pokemonId: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
      },
      moveId: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'pokemon_moves',
      timestamps: false,
    },
  );
};

export default PokemonMove;
