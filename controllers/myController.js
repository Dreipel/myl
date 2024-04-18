const Cards = require('../models/Cards');

const method1 = async (req, res)=>{ 
    res.send("Hello, Welcome to our Page"); 
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