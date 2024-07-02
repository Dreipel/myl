// 3rd Party Modules 
const { Router } = require('express'); 
  
// Local Modules 
const cardController = require('../controllers/cardController'); 
  
// Initialization 
const router = Router(); 
  
// Requests  
router.get('/', cardController.generateImgCompress); 
router.post('/', cardController.createCards); 
module.exports = router;