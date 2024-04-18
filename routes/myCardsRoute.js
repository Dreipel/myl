// 3rd Party Modules 
const { Router } = require('express'); 
  
// Local Modules 
const myCardController = require('../controllers/myCardController'); 
  
// Initialization 
const router = Router(); 
  
// Requests  

router.post('/', myCardController.postMyCard); 
router.delete('/', myCardController.deleteMyCard); 
router.post('/multiple', myCardController.postMyCards); 
router.post('/Collection', myCardController.getMyCards); 


  
module.exports = router;