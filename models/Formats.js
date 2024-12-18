const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Formats = new Schema({
    name: { type: String },
    order: { type: Number }, 
});

module.exports = mongoose.model('formats', Formats);
