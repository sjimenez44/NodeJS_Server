const express = require('express');
const router = express.Router();
const orderController = require('./controller.js');

router.post('/order', orderController.createOrder);
router.get('/order', orderController.getOrders);
router.get('/order/:codeId', orderController.getOrder);
router.put('/order/:codeId', orderController.updateOrder);
router.delete('/order/:codeId', orderController.deleteOrder);

module.exports = router;