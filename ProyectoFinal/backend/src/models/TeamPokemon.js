import { DataTypes } from 'sequelize';

const TeamPokemon = (sequelize) => {
  return sequelize.define(
    'TeamPokemon',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'teams', key: 'id' },
      },

      pokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'pokemons', key: 'id' },
      },

      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'items', key: 'id' },
      },

      abilityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'abilities', key: 'id' },
      },

      natureId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'natures', key: 'id' },
      },

      hpEV: { type: DataTypes.INTEGER, defaultValue: 0 },
      atkEV: { type: DataTypes.INTEGER, defaultValue: 0 },
      defEV: { type: DataTypes.INTEGER, defaultValue: 0 },
      spAtkEV: { type: DataTypes.INTEGER, defaultValue: 0 },
      spDefEV: { type: DataTypes.INTEGER, defaultValue: 0 },
      speedEV: { type: DataTypes.INTEGER, defaultValue: 0 },

      hpIV: { type: DataTypes.INTEGER, defaultValue: 31 },
      atkIV: { type: DataTypes.INTEGER, defaultValue: 31 },
      defIV: { type: DataTypes.INTEGER, defaultValue: 31 },
      spAtkIV: { type: DataTypes.INTEGER, defaultValue: 31 },
      spDefIV: { type: DataTypes.INTEGER, defaultValue: 31 },
      speedIV: { type: DataTypes.INTEGER, defaultValue: 31 },
    },
    {
      tableName: 'team_pokemons',
      timestamps: true,
      validate: {
        maxEVs() {
          const total = this.hpEV + this.atkEV + this.defEV + this.spAtkEV + this.spDefEV + this.speedEV;
          if (total > 508) {
            throw new Error('Los EVs no pueden superar 508 puntos.');
          }
        },
      },
    },
  );
};

export default TeamPokemon;
