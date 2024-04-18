// 3rd Party Modules 
const { Router } = require('express'); 
  
// Local Modules 
const editionController = require('../controllers/editionController'); 
  
// Initialization 
const router = Router(); 
  
// Requests  
router.get('/', editionController.getEditions); 
  
module.exports = router;