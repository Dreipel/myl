const { Storage } = require('@google-cloud/storage');
const urlBlobAzure = "https://storage.cloud.google.com/myl-collector";
const connectionAzureBlob = "DefaultEndpointsProtocol=https;AccountName=fiordoaustral;AccountKey=/12pN4dZciYsTm0NNOyWWl+3gjctIbh0O44uRniGn2ICDVKq6TjO8i/F9VNJPLqEgL2jDCbXnxMHDv9IWc+g3A==;EndpointSuffix=core.windows.net";
const storage = new Storage({
    keyFilename: `./myl-collection-0aec4c505f43.json`,
});

const BlobGenerateImage = async ( { fileName ,data, edition } ) =>{
    
    const BUCKET_NAME = 'myl-collector'
    // const mimeType = data.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const file = storage
    .bucket(BUCKET_NAME)
    .file(`cards/${edition}/${fileName}`);

   //const base64EncodedString = data.replace(/^data:\w+\/\w+;base64,/, '')
    const fileBuffer = Buffer.from(data, 'base64')
    await file.save(fileBuffer);

    const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/cards/${edition}/${fileName}`;

    return publicUrl;
}

const BlobGenerateImageEdition = async ( { fileName ,data } ) =>{
    
    const BUCKET_NAME = 'myl-collector'

    const file = storage
    .bucket(BUCKET_NAME)
    .file(`editions/${fileName}`);

    const fileBuffer = Buffer.from(data, 'base64')
    await file.save(fileBuffer);

    const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/editions/${fileName}`;

    return publicUrl;
}

module.exports = {
    BlobGenerateImage,
    BlobGenerateImageEdition
}