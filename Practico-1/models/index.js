const {sequelize} = require('../config/db.config');


const Burguer = require('./burguer')(sequelize);

module.exports = {
    Burguer,
    sequelize,
    Sequelize: sequelize.Sequelize,
};