// 3rd Party Modules 
const { Router } = require('express'); 
  
// Local Modules 
const userController = require('../controllers/userController'); 
  
// Initialization 
const router = Router(); 
  
// Requests  
router.get('/', userController.postUser); 
  
module.exports = router;