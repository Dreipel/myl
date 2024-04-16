const mongoose = require('mongoose');
require('dotenv/config'); 
const uri = process.env.CONNECTION;
async function connect(){
    try {
        await mongoose.connect(uri);
        console.log("connected to MongoDB");
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    connect
}