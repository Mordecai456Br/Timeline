
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js")

router.get('/users', userController.findAll);
router.get('/users/:id',userController.findById);
router.post('/users',userController.create);
router.put('/users/:id',userController.update);
router.delete('/users/:id',userController.remove);
router.delete('/users', userController.returnRemove);

module.exports = router;

