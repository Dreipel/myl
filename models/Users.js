const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Users = new Schema({
   email: {type: String},
   name: {type: String},
   token: {type: String},
   image: {type: String}
});

module.exports = mongoose.model('users', Users);
