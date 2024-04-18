const Users = require('../models/Users.js');
const { RESPONSE } = require('../helpers/response_helper.js');
const { validateEmail } = require('../helpers/validate_helper.js');

//post user to create users o get user created
const postUser = async (req, res)=>{ 
    const {body} = req;
    //validate if email, name and token are sended
    if(!body.email || !body.name || !body.token || body.email === "" || body.name === "" || body.token === "" ){
        return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
    }
    //validate if email have a correct format
    if(!validateEmail(body.email)){
        return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
    }

    //find any user with email sended
    let resp = await Users.find({email: body.email }).exec();
    //if is not found a create it
    if(Array.isArray(resp) && resp.length === 0){
        let user = new Users(body);
        resp = await user.save();
    }
    //response the user created or not created
    RESPONSE({error: false,message:'Login ok',status:200,data: resp,res });
} 



module.exports = { 
    postUser
}