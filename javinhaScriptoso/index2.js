console.log("Events ahead!");

const express = require("express");
const { events, Event } = require('./event.js');

const server = express();
server.use(express.json());


server.get("/events", (req, res) => {
    res.json( events);
});

server.get("/events/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const event = events.find((event) => event.id === id);
    if (!event) {
        return res.status(404).json({message: 'event not found'})
    }
    res.json(event);
})

server.get("/events/timeAgo/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const event = events.find((event) => event.id === id);
    res.json({message: event.howManyTimeAgo(), date: event.date});
})


server.post("/events", (req, res) => {
    const { name, date, description} = req.body;
    const id = events.length; 
    const newEvent = new Event(id, name, date, description);

    events.push(newEvent);
    res.status(201).json({ message: 'event added', event: newEvent.getInfo() });
});

server.put("/events/:id",(req,res) => {
    const id = Number(req.params.id);
    const event = events.find((event) => event.id === id);

    if (!event) {
        res.status(404).json({message: 'event not found'});
    } else {
        Object.assign(event,req.body);
        res.json({message: 'event updated', event});
    }
})

server.delete("/events/:id", (req,res) => {
    const id = Number(req.params.id);
    const index = events.findIndex((event) => event.id === id);

    if (index === -1){
        return res.status(404).json({message: 'event not found'});
    }
    const deletedItem = events.splice(index,1)[0];
    res.json({message: 'item deleted', item: deletedItem});

});

server.listen(3000, () => {
    console.log("Server running on port: 3000");
});
