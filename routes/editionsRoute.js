// 3rd Party Modules 
const { Router } = require('express'); 
  
// Local Modules 
const editionController = require('../controllers/editionController'); 
  
// Initialization 
const router = Router(); 
  
// Requests  
router.get('/', editionController.getEditions); 
router.put('/', editionController.putEdition);
router.post('/', editionController.postEdition);
  
module.exports = router;