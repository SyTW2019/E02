'use strict'

var validator = require('validator');
var Game = require('../models/game.model');

var controller = {

    datosJuego: (req,res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            title: 'Red Dead Redemption 2',
            description: 'siajfbvoisuwh erpiwh pu',
            autor: 'Rockstar Games',
            date: '10/10/10',
            image: 'ñivsfvffv',
            precio: {
                game: 25,
                amazon: 35,
                fnac: 30,     
            },
        })
    },

    test: (req,res) => {
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de articulos'
        });
    },

    saveGame: (req,res) => {
        // Recoger parametros por post
        var params = req.body;
        //Validar datos(validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_description = !validator.isEmpty(params.description);
            var validate_autor = !validator.isEmpty(params.autor);
            var validate_image = !validator.isEmpty(params.image);
            var validate_date = !validator.isEmpty(params.date);
            var validate_price = !validator.isEmpty(params.price);

        }catch(err){
            return res.status(400).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }
        
        if(validate_autor && validate_date && validate_description && validate_image
            && validate_price && validate_title)
        {
        
            //crear el objeto a guardar
            var game = new Game();
            
            //asignat valores
            game.title = params.title;
            game.description = params.description;
            game.autor = params.autor;
            game.image = params.image;
            game.date = params.date;
            game.price = params.price;

            console.log(game);
            
            //guardar el articulo
            game.save();

            //devolver uan respuesta
            return res.status(200).send({
                status: 'success',
                game
            });
        }else{
            return res.status(400).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    },

    getGames: (req,res) => {

        var query = Game.find({});
        var last = req.params.last;
        if(last || last != undefined){
            query.limit(6);
        }
        //Find
        query.exec((err,games) => {
            if(err){
                return res.status(500).send({
                  status: "error",
                  message: "Error al devolver los articulos"
                });
            }
            else if(!games){
                return res.status(200).send({
                  status: "error",
                  message: "No hay articulos a mostrar !!!"
                });
            }
            else{
                return res.status(200).send({
                    status: 'success',
                    games
                });
            }   
        })
    },

    update: (req,res) => {
        // Recoger el id del articulo por la url
        var gameId = req.params.id;
        
        //recoger los datos
        var params = req.body;

        //validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_description = !validator.isEmpty(params.description);
            var validate_autor = !validator.isEmpty(params.autor);
            var validate_image = !validator.isEmpty(params.image);
            var validate_date = !validator.isEmpty(params.date);
            var validate_price = !validator.isEmpty(params.price);

        }catch(err){
            return res.status(400).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }

        if(validate_autor && validate_date && validate_description && validate_image
            && validate_price && validate_title)
        {
            // find and update
            Game.findByIdAndUpdate({_id: gameId},params, {new:true},(err,gameUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al actualizar'
                    });
                }
                if(!gameUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'no existe el objeto'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    user: gameUpdated
                });
            });
            //devolver una respuesta
        }else{
            return res.status(404).send({
                status: 'error',
                message: 'validacion no correcta'
            });
        }
    },

    delete: (req,res) => {
        //recoger el id de la url
        var gameId = req.params.id;
        //find and delete
        User.findOneAndDelete({_id: gameId}, (err,gameRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al borrar'
                });
            }
            if(!gameRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'no existe el objeto'
                });
            }
            return res.status(200).send({
                status: 'success',
                user: gameRemoved
            });
        })
    },

    search: (req,res) => {
        //sacar el string a buscar
        var searchString = req.params.search;

        //find or
        Game.find({"$or": [
            { "title":{ "$regex": searchString, "$options": "i"} },
            { "description":{ "$regex": searchString, "$options": "i"} },
            { "autor":{ "$regex": searchString, "$options": "i"} }
        ]})
        .exec((err,games) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al buscar'
                });
            }
            if(!games || games.length <=0){
                return res.status(404).send({
                    status: 'error',
                    message: 'no hay juegos que coincidan con tu busqueda'
                });
            }
            return res.status(200).send({
                status: 'success',
                user: games
            });
        })
    }

}; 
//end controller


module.exports = controller;