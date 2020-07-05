var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = Schema({
    gameStore: {type: [], required:true},
    gameTitle: {type: String, required:true},
    gamePrice: {type: [], required:true},
    imageSrc: {type: String, required:true},
    dataCategory: {type: String, required:true},
    gameLink: {type: [], required:true},
    description: {type: String, required:true},
    gameRating: {type:Number},
    proximamente: {type:Number},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Game',schema);