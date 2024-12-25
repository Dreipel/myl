const Formats = require('../models/Formats.js');
const { RESPONSE } = require('../helpers/response_helper.js');

//post user to create users o get user created
const getFormats = async (req, res)=>{ 
    const formats = await Formats.find({ enabled: true }).sort({ order : 'asc'});
    //response the user created or not created
    RESPONSE({error: false,message:'Formatos encontrados',status:200,data: formats,res });
} 

module.exports = { 
    getFormats
}