

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Races = new Schema({ 
    id: { type: Number }, 
    slug: { type: String },
    name: { type: String }
});

module.exports = mongoose.model('races', Races);