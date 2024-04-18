const Editions = require('../models/Editions.js');
const { RESPONSE } = require('../helpers/response_helper.js');

//post user to create users o get user created
const getEditions = async (req, res)=>{ 
    const editions = await Editions.find();
    //response the user created or not created
    RESPONSE({error: false,message:'Login ok',status:200,data: editions,res });
} 



module.exports = { 
    getEditions
}