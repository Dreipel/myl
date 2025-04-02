const mongoose = require('mongoose');
require('dotenv/config'); 
const uri = process.env.CONNECTION;
async function connect(){
    try {
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: { w: "majority" }
        });
        console.log("connected to MongoDB");
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    connect
}