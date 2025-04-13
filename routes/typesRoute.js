// 3rd Party Modules 
const { Router } = require('express'); 
  
// Local Modules 
const typeController = require('../controllers/typeController'); 
  
// Initialization 
const router = Router(); 
  
// Requests  
router.get('/', typeController.getTypes); 
  
module.exports = router;