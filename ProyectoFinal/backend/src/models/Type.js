const Type = (sequelize) => {
  return sequelize.define(
    'Type',
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
      color: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'types',
      timestamps: false,
    },
  );
};

export default Type;
