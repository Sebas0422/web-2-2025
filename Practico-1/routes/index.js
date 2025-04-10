module.exports = (app) => {
    require('./restaurant.routes')(app);
    require('./burger.routes')(app);
    require('./home.routes')(app);
}