const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Burguer = sequelize.define(
        'Burguer',
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
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'burgers',
            timestamps: false,
        }
    )
    return Burguer;
}