// 3rd Party Modules 
const { Router } = require('express'); 
  
// Local Modules 
const raceController = require('../controllers/raceController'); 
  
// Initialization 
const router = Router(); 
  
// Requests  
router.get('/', raceController.getRaces); 
  
module.exports = router;