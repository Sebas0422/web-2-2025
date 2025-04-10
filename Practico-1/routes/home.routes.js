module.exports = (app) => {
    let router = require('express').Router();
    const controller = require('../controllers/home.controller');

    router.get('/', controller.index);
    app.use('', router);
}