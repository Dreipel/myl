const Editions = require('../models/Editions.js');
const { RESPONSE } = require('../helpers/response_helper.js');
const mongoose = require('mongoose');
const { compress } = require('../helpers/compressImage.js');
const { default: axios } = require('axios');
const { BlobGenerateImageEdition } = require('../services/azureblobstorage.service.js');

//post user to create users o get user created
const getEditions = async (req, res)=>{ 
    const editions = await Editions.find();
    //response the user created or not created
    RESPONSE({error: false,message:'Ediciones encontradas',status:200,data: editions,res });
} 

const putEdition = async (req, res)=>{ 
    const body = req.body;

    const image = await axios.get(body.url, {responseType: 'arraybuffer'});
    const returnedB64 = Buffer.from(image.data).toString('base64');
    const returnedB64Compressed = await compress({ base64: returnedB64 });

    const urlCompressed = await BlobGenerateImageEdition({fileName: body.fileName ,data: returnedB64Compressed });
    const url = await BlobGenerateImageEdition({fileName: body.fileNameCompress ,data: returnedB64 });

    const resp = await Editions.updateOne({_id: body._id},{
        id: body.id,
        slug: body.slug,
        name: body.name,
        image: body.image,
        image: url,
        image_compress: urlCompressed,
    })
    //response the user created or not created
    RESPONSE({error: false,message:'Edicion actualizada',status:200,data: resp,res });
} 


const postEdition = async (req, res)=>{ 
    const body = req.body;

    const image = await axios.get(body.url, {responseType: 'arraybuffer'});
    const returnedB64 = Buffer.from(image.data).toString('base64');
    const returnedB64Compressed = await compress({ base64: returnedB64 });

    const urlCompressed = await BlobGenerateImageEdition({fileName: body.fileName ,data: returnedB64Compressed });
    const url = await BlobGenerateImageEdition({fileName: body.fileNameCompress ,data: returnedB64 });
   
    let edition = new Editions({
        id: body.id, 
        slug: body.slug,
        name: body.name,
        image: url,
        image_compress: urlCompressed,
    });
    
    const editionCreated = await edition.save();

    //response the user created or not created
    RESPONSE({error: false,message:'Edicion actualizada',status:200,data: editionCreated ,res });
} 



module.exports = { 
    getEditions,
    putEdition,
    postEdition
}