const express = require('express');
const app = express();

app.use(express.json());

const Event = require('./event');
const { request } = require('http');

const PORT = 3000;
const events = [];

//const viagemRecife = new Event("Travel to Recife",new Date(2025,7,11),"viagem para recife junto da babson");
//const eclipse = new Event("Eclipse", new Date(2023,9,14),"eclipse na praia do jacaré c maryloponi","ola")

app.get('/',(request,response)=>{
    response.send("Server on!");
});

app.post('/events',(request,response)=>{
    const {name, date, description, password} = request.body;
    if (!name || !date || !description) {
        return response.status(400).json({error: 'name, date and description are required'});
    }
    const newEvent = new Event (name, new Date(date), description, password || null);
    events.push(newEvent);

    return response.status(201).json({message: 'Event created', id: events.length -1}, console.log(events));
});

app.post('/events/:id',(request,response)=>{
    const {password} = request.body;
    const id = parseInt(request.params.id);

    const event = events[id];
    if (!event) return response.status(404).json({error: 'Event not found'});

    return response.json(event.getInfo(password));
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
console.log(events);

//viagemRecife.howManyTimeAgo();
//eclipse.howManyTimeAgo();
//console.log(viagemRecife);
