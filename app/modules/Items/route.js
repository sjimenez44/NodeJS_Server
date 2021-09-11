const express = require('express');
const router = express.Router();
const itemController = require('./controller.js');

router.post('/item', itemController.createItem);
router.get('/item', itemController.getItems);
router.get('/item/:codeId', itemController.getItem);
router.put('/item/:codeId', itemController.updateItem);
router.delete('/item/:codeId', itemController.deleteItem);

module.exports = router;