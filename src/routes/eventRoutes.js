
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js")

router.get('/events', eventController.findAll);
router.get('/events/:id',eventController.findById);
router.get('/events/timeAgo/:id',eventController.timeAgo);
router.post('/events',eventController.create);
router.put('/events/:id',eventController.update);
router.delete('/events/:id',eventController.remove);
router.delete('/events', eventController.returnRemove);


module.exports = router;

