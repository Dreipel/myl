const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Cards = new Schema({
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
    id_edition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'editions'
    },
    id_keyword: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'keywords'
    },
    id_race: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'races'
    },
    id_raritie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rarities'
    },
    id_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'types'
    },
});

module.exports = mongoose.model('cards', Cards);
