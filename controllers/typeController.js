const Types = require('../models/Types.js');
const { RESPONSE } = require('../helpers/response_helper.js');

//post user to create users o get user created
const getTypes = async (req, res)=>{ 
    const types = await Types.find({enabled:true});
    //response the user created or not created
    RESPONSE({error: false,message:'Tipos encontrados',status:200,data: types,res });
}

module.exports = { 
    getTypes
}