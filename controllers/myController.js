const mongoose = require('mongoose');

// // User model 
// const Editions = mongoose.model('editions', { 
//     id: { type: Number }, 
//     slug: { type: String },
//     name: { type: String },
// });

// const Keywords = mongoose.model('keywords', { 
//     id: { type: Number }, 
//     slug: { type: String },
//     name: { type: String },
// });

// const Races = mongoose.model('races', { 
//     id: { type: Number }, 
//     slug: { type: String },
//     name: { type: String },
// }); 

// const Rarities = mongoose.model('rarities', { 
//     id: { type: Number }, 
//     slug: { type: String },
//     name: { type: String },
// }); 

// const Types = mongoose.model('types', { 
//     id: { type: Number }, 
//     slug: { type: String },
//     name: { type: String },
// }); 


// const Cards =  mongoose.model('cards', {
//     id: { type: Number }, 
//     slug: { type: String },
//     name: { type: String },
//     edid: { type: String},
//     rarity: { type: Number },
//     race: { type: Number },
//     type: { type: Number },
//     cost: { type: Number },
//     damage: { type: Number },
//     ability: { type: String },
//     flavour: { type: String },
//     ed_edid: { type: Number },
//     ed_slug: { type: String },
//     folio: { type: Number },
//     image: { type: String },
//     name_edition: { type: String },
//     name_keyword: { type: String },
//     name_race: { type: String },
//     name_raritie: { type: String },
//     name_type: { type: String },
//     id_edition: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'editions'
//     },
//     id_keyword: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'keywords'
//     },
//     id_race: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'races'
//     },
//     id_raritie: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'rarities'
//     },
//     id_type: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'types'
//     },
// });

const method1 = async (req, res)=>{ 
    res.send("Hello, Welcome to our Page"); 
   
    // const ediciones = await Editions.find({}).exec();
    // const keywords = await Keywords.find({}).exec();
    // const races = await Races.find({}).exec();
    // const rarities = await Rarities.find({}).exec();
    // const types = await Types.find({}).exec();
    // let arrayInsert = [];
    // cards.forEach((card,index) => {
    //     //url de la imagen alojadas. Luego de cards viene el id de la edicion y luego el edid (es un string)
    //     //https://api.myl.cl/static/cards/73/239.png
    //     card.image = 'https://api.myl.cl/static/cards/73/'+card.edid+'.png';
    //     card.rarity = card.rarity !== null ? parseInt(card.rarity) : null;
    //     card.race = card.race !== null ? parseInt(card.race) : null;
    //     card.type = card.type !== null ? parseInt(card.type) : null;
    //     card.cost = card.cost !== null ? parseInt(card.cost) : null;
    //     card.damage = card.damage !== null ? parseInt(card.damage) : null;
    //     card.folio = 0;
    //     card.ed_edid = card.ed_edid !== null ? parseInt(card.ed_edid) : null;
        
    //     let edicion = ediciones.filter((x)=> x.id === card.ed_edid)[0] !== undefined ? ediciones.filter((x)=> x.id === card.ed_edid)[0]._id : null;
    //     let keyword = null;
    //     let race = races.filter((x)=> x.id === card.race)[0]  !== undefined ? races.filter((x)=> x.id === card.race)[0]._id : null;
    //     let rarity = rarities.filter((x)=> x.id === card.rarity)[0]  !== undefined ? rarities.filter((x)=> x.id === card.rarity)[0]._id : null;
    //     let type = types.filter((x)=> x.id === card.type)[0]  !== undefined ? types.filter((x)=> x.id === card.type)[0]._id : null;

    //     card.id_edition=edicion;
    //     card.id_keyword=keyword;
    //     card.id_race=race;
    //     card.id_raritie=rarity;
    //     card.id_type=type;
    //     arrayInsert.push(card);
    // });

    
    
    // Cards.insertMany(arrayInsert).then(function(){ 
    //     console.log("Data inserted")  // Success 
    // }).catch(function(error){ 
    //     console.log(error)      // Failure 
    // });

} 
  
const method2 = async (req, res)=>{ 

    const resp = await Cards.find().exec();
    res.status(200).send(resp);
} 
  
// Export of all methods as object 
module.exports = { 
    method1, 
    method2 
}