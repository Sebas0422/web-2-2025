module.exports = (app) => {
    let router = require('express').Router();
    const controller = require('../controllers/burger.controller');
    
    router.get('/', controller.getBurgerList);
    router.get('/:id', controller.getBurger);
    router.post('/', controller.createBurger);
    router.post('/:id/rate', controller.rateBurger);
    router.put('/:id', controller.updateBurger);
    router.delete('/:id', controller.deleteBurger);

    app.use('/burgers', router);
}