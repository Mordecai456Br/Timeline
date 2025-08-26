
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js")

router.get('/events', eventController.listAll);
router.get('/events/:id',eventController.getById);
router.get('/events/timeAgo/:id',eventController.timeAgo);
router.post('/events',eventController.create);
router.put('/events/:id',eventController.update);
router.delete('/events/:id',eventController.remove);

module.exports = router;

