module.exports = (app) => {
    let router = require('express').Router();
    const controller = require('../controllers/burguer.controller');
    
    router.get('/', controller.getBurguerList);
    router.get('/:id', controller.getBurguer);
    router.post('/', controller.createBurguer);
    router.put('/:id', controller.updateBurguer);
    router.delete('/:id', controller.deleteBurguer);

    app.use('/burguer', router);
}