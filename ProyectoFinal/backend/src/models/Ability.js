const Ability = (sequelize) => {
  return sequelize.define(
    'Ability',
    {
      id: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
      },
      isHidden: {
        type: sequelize.Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'abilities',
      timestamps: false,
    },
  );
};

export default Ability;
