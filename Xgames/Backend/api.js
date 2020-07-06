const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const config = require("./configuration.json");
const db = require('./_helpers/game_db');
const u_db = require('./_helpers/db');
const Game = db.Game;
const User = u_db.User;


router.get('/', (req, res) => {

    Game.find({ }).then((data) => {
        console.log('Data:', data);
        res.json(data);

    })
    .catch((err) => {
        console.log('Error: ', err);
    })
})

router.get('/get_user', (req,res) => {
    
    User.find({ }).then((data) => {
        console.log('Users: ',data);
        res.json(data);
    })
    .catch((err) => {
        console.log('Error: ',err);
    })
})

router.post('/save', (req,res) => {
    console.log('Body: ', req.body);
    var game = new Game(req.body);

    game.save((error) => {
        if(error){
            res.status(500).json({ msg: 'Internal service error'});
        }

        return res.json({
            msg: 'The data has been saved'
        });
    })
});

router.post('/save_favorite', (req,res) => {
    console.log('Body: ', req.body);

    User.remove({ username: req.body.username});
    var user = new User(req.body);
    console.log('bbcc');
    user.save((error) => {
        if(error){
            res.status(500).json({ msg: 'Internal service error'});
        }

        return res.json({
            msg: 'The data has been saved'
        });
    })
});

module.exports = router;