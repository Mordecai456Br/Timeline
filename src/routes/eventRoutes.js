
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController.js")

router.get('/events', eventController.listAll);
router.get('/events',eventController.getById);
router.get('/events',eventController.timeAgo);
router.post('/events',eventController.create);
router.put('/events',eventController.update);
router.delete('/events',eventController.remove);

module.exports = router;

