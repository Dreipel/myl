const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Editions = new Schema({ 
    id: { type: Number }, 
    slug: { type: String },
    name: { type: String },
    image: { type: String },
    image_compress: { type: String },
    format: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'formats'
    },
    formatName: { type: String },
    order:{ type: Number},
});

module.exports = mongoose.model('editions', Editions);
