const Races = require('../models/Races.js');
const { RESPONSE } = require('../helpers/response_helper.js');

//post user to create users o get user created
const getRaces = async (req, res)=>{ 
    const races = await Races.find({enabled: true});
    //response the user created or not created
    RESPONSE({error: false,message:'Razas encontrados',status:200,data: races,res });
}

module.exports = { 
    getRaces
}