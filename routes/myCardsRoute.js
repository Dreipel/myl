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
router.post('/Deck', myCardController.postDeck);
router.put('/Deck', myCardController.putDeck);
router.get('/MyDecks', myCardController.getDecks);
router.get('/MyDeck', myCardController.getMyDeck); 



router.put('/ReactualizarImagenes', myCardController.putReactualizarImagenes); 
  
module.exports = router;