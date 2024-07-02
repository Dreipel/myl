const { RESPONSE } = require('../helpers/response_helper');
const Cards = require('../models/Cards');
const { BlobGenerateImage } = require('../services/azureblobstorage.service');
const Editions = require('../models/Editions');
const Races = require('../models/Races');
const Rarities = require('../models/Rarities');
const Types = require('../models/Types');
const { default: axios } = require('axios');
const { compress } = require('../helpers/compressImage');
const { default: mongoose } = require('mongoose');


const generateImgCompress = async (req, res)=>{ 

    const objectEdition = new mongoose.Types.ObjectId("661dd286c37a3d3327b5379f");
    const cartas = await Cards.find({ id_edition: objectEdition });
    console.log('actualizando imagen compress')

    console.log(cartas.length);

    for (let index = 0; index < cartas.length; index++) {
        await timeout(2000);
        let carta = cartas[index];
        //carta = JSON.parse(JSON.stringify(carta));
      
        let url = 'https://api.myl.cl/static/cards/73/'+carta.edid+'.png';
        const image = await axios.get(url, {responseType: 'arraybuffer'});
        const returnedB64 = Buffer.from(image.data).toString('base64');
        const returnedB64Compressed = await compress({ base64: returnedB64 });
    
        const urlCompressed = await BlobGenerateImage({fileName: carta.edid+'_low.png' ,data: returnedB64Compressed,edition: "explorandum" });
        console.log('=====================================')
        console.log(carta.id);
        console.log(carta._id);
        console.log(carta.name);
        await Cards.updateOne({_id: carta._id},{ image_compress: urlCompressed });
    }

    RESPONSE({error: false,message:'Cartas actualizadas',status:200,data: {},res });
} 
  

const generateFolio = async (req, res)=>{ 
    const cartas = await Cards.find();


    for (let index = 0; index < cartas.length; index++) {
        await timeout(2000);
        let carta = cartas[index];
        //carta = JSON.parse(JSON.stringify(carta));
        let folio = parseInt(carta.edid);
        console.log('=====================================')
        console.log(carta.id);
        console.log(carta._id);
        console.log(carta.name);
        console.log(folio);
        await Cards.updateOne({_id: carta._id},{ folio: folio });
    }

    RESPONSE({error: false,message:'Cartas actualizadas',status:200,data: {},res });
} 
  
const timeout = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const createCards = async ( req,res ) =>{

    const { arrayCards, nameEdition } = req.body;

    if(!Array.isArray(arrayCards)){
        return RESPONSE({error: true,message:'Se deben enviar el listado de cartas',status:200,data:[],res});
    }

    let cards = [...arrayCards];

    const ediciones = await Editions.find({}).exec();
    const races = await Races.find({}).exec();
    const rarities = await Rarities.find({}).exec();
    const types = await Types.find({}).exec();
    
    for (let index = 0; index < cards.length; index++) {
        let card = cards[index];
        const preUrl = 'https://api.myl.cl/static/cards/'+card.ed_edid+'/'+card.edid+'.png';


        card.rarity = card.rarity !== null ? parseInt(card.rarity) : null;
        card.race = card.race !== null ? parseInt(card.race) : null;
        card.type = card.type !== null ? parseInt(card.type) : null;
        card.cost = card.cost !== null ? parseInt(card.cost) : null;
        card.damage = card.damage !== null ? parseInt(card.damage) : null;
        card.folio = parseInt(card.edid);;
        card.ed_edid = card.ed_edid !== null ? parseInt(card.ed_edid) : null;
      
        
        let edicion = ediciones.filter((x)=> x.id === card.ed_edid)[0] !== undefined ? ediciones.filter((x)=> x.id === card.ed_edid)[0]._id : null;
        let keyword = null;
        let race = races.filter((x)=> x.id === card.race)[0]  !== undefined ? races.filter((x)=> x.id === card.race)[0]._id : null;
        let rarity = rarities.filter((x)=> x.id === card.rarity)[0]  !== undefined ? rarities.filter((x)=> x.id === card.rarity)[0]._id : null;
        let type = types.filter((x)=> x.id === card.type)[0]  !== undefined ? types.filter((x)=> x.id === card.type)[0]._id : null;

        card.id_edition=edicion;
        card.id_keyword=keyword;
        card.id_race=race;
        card.id_raritie=rarity;
        card.id_type=type;

       
        const image = await axios.get(preUrl, {responseType: 'arraybuffer'});
        const returnedB64 = Buffer.from(image.data).toString('base64');
        const returnedB64Compressed = await compress({ base64: returnedB64 });
    
        const urlCompressed = await BlobGenerateImage({fileName: card.edid+'.png' ,data: returnedB64Compressed,edition: nameEdition });
        const url = await BlobGenerateImage({fileName: card.edid+'_low.png' ,data: returnedB64 , edition: nameEdition });

        card.image = url;
        card.image_compress = urlCompressed;

        await timeout(1000);

        const newCard = new Cards(card);
        const cardCreated = await newCard.save();
        console.log(cardCreated);
    }
    

    RESPONSE({error: false,message:'Cartas actualizadas',status:200,data: {},res });

}

// Export of all methods as object 
module.exports = { 
    generateFolio,
    createCards,
    generateImgCompress
}