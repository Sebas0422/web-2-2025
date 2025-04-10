module.exports = (app) => {
  let router = require('express').Router();
  const controller = require('../controllers/restaurant.controller');

  router.get('/', controller.getRestaurantList);
  router.get('/:id', controller.getRestaurant)
  router.post('/', controller.postCreateRestaurant);
  
  app.use('/restaurants', router);
}