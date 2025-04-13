const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Decks = new Schema({
    name: { type: String },
    cards: [{
        quantity: { type: Number },
        cardId: { type: Schema.Types.ObjectId } ,
        name: { type: String },
        id: { type: Number }, 
        slug: { type: String },
        name: { type: String },
        edid: { type: String},
        rarity: { type: Number },
        race: { type: Number },
        type: { type: Number },
        cost: { type: Number },
        damage: { type: Number },
        ability: { type: String },
        flavour: { type: String },
        ed_edid: { type: Number },
        ed_slug: { type: String },
        folio: { type: Number },
        image: { type: String },
        image_compress: { type: String },
        name_edition: { type: String },
        name_keyword: { type: String },
        name_race: { type: String },
        name_raritie: { type: String },
        name_type: { type: String },
    }],
    format: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'formats'
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    formatName: { type: String },
});

module.exports = mongoose.model('decks', Decks);
