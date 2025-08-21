console.log("Events ahead!");

const express = require("express");
const { events, Event } = require('./event.js');

const server = express();
server.use(express.json());

// Retorna todos os eventos
server.get("/events", (req, res) => {
    // Mapeia as instâncias para objetos JSON
    const eventList = events.map(e => e.getInfo());
    res.json(eventList);
});

server.get("/events/timeAgo/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const event = events[id];
    res.json({message: event.howManyTimeAgo()});
})

// Cria um novo evento
server.post("/events", (req, res) => {
    const { name, date, description, password } = req.body;
    const id = events.length; // ID sequencial
    const newEvent = new Event(id, name, date, description, password);

    events.push(newEvent);
    res.json({ message: 'event added', event: newEvent.getInfo(password) });
});

server.listen(3000, () => {
    console.log("Server running on port: 3000");
});
