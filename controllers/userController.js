const Users = require('../models/Users.js');
const { RESPONSE } = require('../helpers/response_helper.js');
const { validateEmail } = require('../helpers/validate_helper.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

//post user to create users o get user created
const postUser = async (req, res)=>{
    try{
        const { credential , client_id } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });
        const { email, name, picture:image, sub:token } = ticket.getPayload();

        //validate if email, name and token are sended
        if(!email || !name || !token || email === "" || name === "" || token === "" ){
            return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
        }
        //validate if email have a correct format
        if(!validateEmail( email )){
            return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
        }
    
        //find any user with email sended
        let resp = await Users.find({email: email }).exec();
        //if is not found a create it
        if(Array.isArray(resp) && resp.length === 0){
            let user = new Users({
                email,
                name,
                token,
                image
            });
            resp = await user.save();
        }
        //response the user created or not created
        RESPONSE({error: false,message:'Login ok',status:200,data: resp,res });
    }catch(error){
        RESPONSE({error: true,message:'Error no controlado',status:200,data:[],res});
    }
    
} 



module.exports = { 
    postUser
}