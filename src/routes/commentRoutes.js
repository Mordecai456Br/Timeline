const express = require('express');
const router = express.Router;
const CommentModel = require ('../controllers/commentController');

router.get('/comments', CommentModel.findAll);
router.get('/comments/:id', CommentModel.findById);

router.post('/comments', CommentModel.create);

router.put('/comments/:id', CommentModel.update);

router.delete('/comments/:id', CommentModel.delete);

module.exports = router;