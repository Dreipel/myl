const MyCards = require('../models/MyCards.js');
const Cards = require('../models/Cards.js');
const { RESPONSE } = require('../helpers/response_helper.js');
const mongoose = require('mongoose');

//post user to create users o get user created
const getMyCards = async (req, res)=>{ 
    try{
        const {id_edition, id_user } = req.body;
        //validate if email, name and token are sended
        if(!id_edition || !id_user){
            return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
        }
        const objectEdition = new mongoose.Types.ObjectId(id_edition);
        const cards = await Cards.aggregate([
            {
                $match: {
                    id_edition: objectEdition
                },
            },
            {
                $lookup: {
                    from: "my_cards", // collection name in db
                    localField: "_id",
                    foreignField: "id_card",
                    as: "collected"
                },
            },
            {
                $unwind:  {
                    "path": "$collected",
                    "preserveNullAndEmptyArrays": true
                }
            }
        ]).exec();

        RESPONSE({error: false,message:'Cartas encontradas',status:200,data: cards,res });
    }catch(error){
        RESPONSE({error: true,message:'Error al crear la carta',status:200,data: error,res });
    }
} 

const postMyCard = async (req,res) =>{
    try{
        const { id_edition, id_user, id_card, quantity  } = req.body;
        let myCard = new MyCards({
            id_edition, 
            id_user, 
            id_card, 
            quantity 
        });
        const resp = await myCard.save();
    
        RESPONSE({error: false,message:'Carta Creada',status:200,data: resp,res });
    }catch(error){
        RESPONSE({error: true,message:'Error al crear la carta',status:200,data: error,res });
    }

}

const postMyCards = async (req,res) =>{
    try{
        const { id_edition, id_user, ids_cards , quantity } = req.body;

        if(!Array.isArray(ids_cards) || ids_cards.length === 0){
            return RESPONSE({error: true,message:'Se debe enviar un arreglo de cartas',status:200,data: [],res });
        }
        let arrayCards = [];

        ids_cards.forEach(idCard => {
            arrayCards.push({
                id_edition: new mongoose.Types.ObjectId(id_edition)
                ,id_user: new mongoose.Types.ObjectId(id_user)
                ,id_card: new mongoose.Types.ObjectId(idCard)
                ,quantity: quantity
            });
        });

        const resp = await MyCards.insertMany(arrayCards);
    
        RESPONSE({error: false,message:'Carta Creada',status:200,data: resp,res });
    }catch(error){
        RESPONSE({error: true,message:'Error al crear la carta',status:200,data: error,res });
    }
}

const deleteMyCard = async (req,res) =>{
    try{
        const { id_my_card } = req.body;
       
        const resp = await MyCards.deleteOne(new mongoose.Types.ObjectId(id_my_card)).exec();
    
        RESPONSE({error: false,message:'Carta eliminada de la coleccion',status:200,data: resp,res });
    }catch(error){
        RESPONSE({error: true,message:'Error al eliminar la coleccion',status:200,data: error,res });
    }

}

module.exports = { 
    getMyCards,
    postMyCard,
    postMyCards,
    deleteMyCard
}