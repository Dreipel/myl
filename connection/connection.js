const mongoose = require('mongoose');

const uri = "mongodb+srv://MYL_CONNECTION:dEFOGktEH8WrqxHI@myl.5zoolzh.mongodb.net";

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