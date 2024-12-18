const Editions = require('../models/Editions.js');
const { RESPONSE } = require('../helpers/response_helper.js');
const mongoose = require('mongoose');
const { compress } = require('../helpers/compressImage.js');
const { default: axios } = require('axios');
const { BlobGenerateImageEdition } = require('../services/azureblobstorage.service.js');
const mime = require('mime');

//post user to create users o get user created
const getEditions = async (req, res)=>{ 
    const { idFormat } = req.query;
    let query = { };
    if( idFormat ){
        query = {
            ...query,
            format: new mongoose.Types.ObjectId(idFormat),
        }
    }

    const editions = await Editions.find(query).sort({ order : 'asc'});
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

    let newBody = {
        id: body.id, 
        slug: body.slug,
        name: body.name ? body.name : body.title ,
        image: body.url ? body.url : body.image,
        image_compress: '',
    }

    if(!newBody.id || !newBody.slug || !newBody.name || !newBody.image){
        return res.status(500).send({error:"No se enviaron todos los valores necesarios para poder crear una edición"});
    }

    const image = await axios.get(newBody.image, {responseType: 'arraybuffer'});
    const contentType = image.headers['content-type'];
    console.log();
    const extension = contentType.split('/');
   
    if(!extension[1]){
        return res.status(500).send({error:"Las imagen no tiene un formato correcto"});
    }
  
    const nameFile = `${newBody.name.trim()}.${extension[1]}`;
    const nameFileCompress = `${newBody.name.trim()}_Compress.${extension[1]}`;

    const returnedB64 = Buffer.from(image.data).toString('base64');
    const returnedB64Compressed = await compress({ base64: returnedB64 });

    const urlCompressed = await BlobGenerateImageEdition({fileName: nameFileCompress,data: returnedB64Compressed });
    const url = await BlobGenerateImageEdition({fileName: nameFile,data: returnedB64 });
 
    let edition = new Editions({
        ...newBody,
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