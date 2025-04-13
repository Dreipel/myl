const MyCards = require('../models/MyCards.js');
const Cards = require('../models/Cards.js');
const { RESPONSE } = require('../helpers/response_helper.js');
const mongoose = require('mongoose');
const axios = require('axios');
const Decks = require('../models/Decks.js');

//post user to create users o get user created
const getMyCards = async (req, res)=>{ 
    try{
        const {id_edition, id_user } = req.body;
        //validate if email, name and token are sended
        if(!id_edition || !id_user){
            return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
        }
        const objectEdition = new mongoose.Types.ObjectId(id_edition);
        const objectUser = new mongoose.Types.ObjectId(id_user);
        const cards = await Cards.aggregate([
            {
                $match: {
                    id_edition: objectEdition
                },
            },
            {
                $lookup: {
                    from: "my_cards", // collection name in db
                    let: { 'card_id': '$_id' },
                    pipeline: [
                        { 
                            $match: { 
                                $expr: {
                                    $and: [
                                        { $eq: ["$id_user", objectUser] },
                                        { $eq: ["$id_card", "$$card_id"] }
                                    ]
                                }
                            } 
                        },
                    ],
                    as: "collected"
                },
            },
            {
                $unwind:  {
                    "path": "$collected",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $sort: {folio: 1}
            }
        ]).exec();

        RESPONSE({error: false,message:'Cartas encontradas',status:200,data: cards,res });
    }catch(error){
        console.log(error);
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

        const card = await myCard.aggregate([
            {
                $match: {
                    id_edition: objectEdition,
                    id_card: id_card,
                },
            },
        ]).exec();

        if( Array.isArray(card) && card.length !== 0 ){
            return RESPONSE({error: false,message:'Carta Creada',status:200,data: card,res });
        }

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

        const deleteCards = await MyCards.deleteMany({ id_edition, id_user });

        console.log(deleteCards)

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

const timeout = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const postDeck = async (req,res) =>{
    try{

        const { name, cards , id_user  } = req.body;

        if( !id_user ){
            return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
        }

        if( Array.isArray(cards) && cards.length === 0 ){
            return RESPONSE({error: false,message:'Se debe enviar el listado de cartas',status:200,data: req.body,res });
        }

        let newCards = cards.map((card) => {
            return data = {
                quantity: card.quantity,
                cardId:  new mongoose.Types.ObjectId(card._id),
                name: card.name,
                id: card.id,
                slug: card.slug,
                name:  card.name,
                edid: card.edid,
                rarity:  card.rarity,
                race: card.race,
                type: card.type,
                cost:  card.cost,
                damage:  card.damage,
                ability: card.ability,
                flavour:  card.flavour,
                ed_edid: card.ed_edid,
                ed_slug: card.ed_slug,
                folio: card.folio,
                image:  card.image,
                image_compress: card.image_compress,
                name_edition:  card.name_edition,
                name_keyword:  card.name_keyword,
                name_race: card.name_race,
                name_raritie: card.name_raritie,
                name_type: card.name_type,
            }
        });

        let myDeck = new Decks({
            name,
            cards:newCards,
            idUser: id_user
        });

        const resp = await myDeck.save();
    
        RESPONSE({error: false,message:'Carta Creada',status:200,data: resp,res });
    }catch(error){
        console.log(error);
        RESPONSE({error: true,message:'Error al crear la carta',status:200,data: error,res });
    }
}

const putDeck = async (req,res) =>{
    try{

        const { _id , name, cards , id_user  } = req.body;

        if( !id_user || !_id ){
            return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
        }

        if( Array.isArray(cards) && cards.length === 0 ){
            return RESPONSE({error: false,message:'Se debe enviar el listado de cartas',status:200,data: req.body,res });
        }

        const objectUser = new mongoose.Types.ObjectId(id_user);
        const objectDeck = new mongoose.Types.ObjectId(_id);
        const myDeck = await Decks.findOne({idUser: objectUser, _id: objectDeck });

        if(!myDeck){
            return RESPONSE({error: false,message:'No se encontro un deck para editar',status:200,data: req.body,res });
        }

        const myNewDeck = await Decks.updateOne({idUser: objectUser, _id: objectDeck },{
            name:name,
            cards:cards,
        });

        if(myNewDeck && myNewDeck.modifiedCount === 1){

            const deckUpdated = await Decks.findOne({idUser: objectUser, _id: objectDeck });

            RESPONSE({error: false,message:'Carta Creada',status:200,data: deckUpdated,res });
        }else{
            RESPONSE({error: true,message:'Error al actualizar deck',status:200,data: {},res });
        }
      
    
       
    }catch(error){
        console.log(error);
        RESPONSE({error: true,message:'Error al actualizar el deck',status:200,data: error,res });
    }
}

const getDecks = async (req, res)=>{ 
    try{
        const { id_user } = req.query;
        //validate if email, name and token are sended
        if( !id_user ){
            return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
        }
        const objectUser = new mongoose.Types.ObjectId(id_user);
        const myDecks = await Decks.find({idUser: objectUser});

        RESPONSE({error: false,message:'Decks encontrados',status:200,data: myDecks,res });
    }catch(error){
        console.log(error);
        RESPONSE({error: true,message:'Error al obtener decks la carta',status:200,data: error,res });
    }
}

const getMyDeck = async (req, res)=>{ 
    try{
        const {id_deck, id_user } = req.query;
        //validate if email, name and token are sended
        if(!id_deck || !id_user){
            return RESPONSE({error: true,message:'Se deben enviar todos los campos',status:200,data:[],res});
        }
        const objectUser = new mongoose.Types.ObjectId(id_user);
        const objectDeck = new mongoose.Types.ObjectId(id_deck);
        const myDeck = await Decks.findOne({idUser: objectUser, _id: objectDeck });

        RESPONSE({error: false,message:'Cartas encontradas',status:200,data: myDeck,res });
    }catch(error){
        console.log(error);
        RESPONSE({error: true,message:'Error al crear la carta',status:200,data: error,res });
    }
}

const putReactualizarImagenes = async (req,res) =>{
    try{
        const resp = await Cards.find().exec();

        for (let index = 0; index < resp.length; index++) {
            const card = resp[index];

            await timeout(2000);
            console.log(index);
            await Cards.updateOne({_id: card._id}, {image: `https://storage.cloud.google.com/myl-collector/cards/explorandum/${card.edid}.png` })
        }
    
        RESPONSE({error: false,message:'Carta eliminada de la coleccion',status:200,data: {},res });
    }catch(error){
        console.log(error);
        RESPONSE({error: true,message:'Error al eliminar la coleccion',status:200,data: error,res });
    }

}


module.exports = { 
    getMyCards,
    postMyCard,
    postMyCards,
    deleteMyCard,
    putReactualizarImagenes,
    postDeck,
    getDecks,
    getMyDeck,
    putDeck
}