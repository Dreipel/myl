
const  sharp = require('sharp');

const compress = async ({ base64 }) =>{
    const uri = base64.split(';base64,').pop()
   
    let imgBuffer = Buffer.from(uri, 'base64');

    const image = sharp(imgBuffer)
    const metadata = await image.metadata();

    const bufferCompressed = await image.toFormat('png').resize(Math.round(metadata.width/2), Math.round(metadata.height/2)).toBuffer();

    return bufferCompressed.toString('base64');
}

module.exports = {
    compress
}