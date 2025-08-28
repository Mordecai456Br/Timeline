const express = require('express');
const router = express.Router();
const commentController = require ('../controllers/commentController');

router.get('/comments', commentController.findAll);
router.get('/comments/:id', commentController.findById);

router.post('/comments', commentController.create);

router.put('/comments/:id', commentController.update);

router.delete('/comments/:id', commentController.remove);

module.exports = router;