const config = require('../configuration.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    Game: require('../models/game.model')
};
