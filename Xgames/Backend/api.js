const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const config = require("./configuration.json");
const db = require('./_helpers/game_db');
const Game = db.Game;


router.get('/', (req, res) => {

    Game.find({ }).then((data) => {
        console.log('Data:', data);
        res.json(data);

    })
    .catch((err) => {
        console.log('error: ', err);
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

module.exports = router;