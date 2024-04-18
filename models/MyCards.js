const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let MyCards = new Schema({
   id_card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cards'
   },
   id_edition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'editions'
   },
   id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
  },
  quantity: { types: Number }
});

module.exports = mongoose.model('my_cards', MyCards);
