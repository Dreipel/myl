// 3rd Party Modules 
const { Router } = require('express'); 
  
// Local Modules 
const formatController = require('../controllers/formatController'); 
  
// Initialization 
const router = Router(); 
  
// Requests  
router.get('/', formatController.getFormats); 
  
module.exports = router;