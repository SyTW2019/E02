require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handlers');
const request = require("request");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const config = require("configuration.json");
const morgan = require('morgan');
mongoose.Promise = global.Promise;


var gamerouter = require('./routes/game');
var userrouter = require('./routes/user');
var data_api = require('./api');

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Añadir prefijos a rutas / Cargar rutas
app.use('/',gamerouter);
app.use('/',userrouter);

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(morgan('tiny'));
app.use('/api', data_api);

app.use(jwt());     // use jwt token auth middleware for security

app.use('/users', require('./users/users.controller')); //set routes 

app.use(errorHandler);
    
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});