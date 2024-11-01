// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); 

// Define routes for cart actions
router.post('/add', cartController.addItemToCart);  
router.get('/:userId', cartController.getCart);        
router.put('/update', cartController.updateCartItem);   
router.delete('/remove', cartController.removeCartItem); 

module.exports = router;
