module.exports = (app) => {
    let router = require('express').Router();
    const controller = require('../controllers/burger.controller');
    
    router.get('/', controller.getburgerList);
    router.get('/:id', controller.getburger);
    router.post('/', controller.createburger);
    router.put('/:id', controller.updateburger);
    router.delete('/:id', controller.deleteburger);

    app.use('/burgers', router);
}