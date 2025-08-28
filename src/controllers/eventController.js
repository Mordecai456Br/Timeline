

const UserModel = require("../models/userModel");
const EventModel = require("../models/eventModel");
const datesUtils = require("../utils/datesUtils");

module.exports = {

    async findAll(req, res) {
        try {
            const events = await EventModel.findAll();
            return res.json(events);
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async findById(req, res) {
        try {
            const id = Number(req.params.id);
            const event = await EventModel.findById(id);
            if (!event) return res.status(404).json({ message: 'event not found' });

            return res.json(event);
            
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async timeAgo(req, res) {
        try {
            const id = Number(req.params.id);
            const event = await EventModel.findById(id);
            if (!event) return res.status(404).json({ message: 'event not found' })

            const eventDate = new Date(event.date);
            const diferenceDays = Math.floor((Date.now() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
            res.json({ message: `${event.name} was ${diferenceDays} days ago`, date: event.date });
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async timeAgoBetween(req, res) {
        try {
            const id = Number(req.params.id);
            const event = await EventModel.findById(id);
            if (!event) return res.status(404).json({ message: 'event not found' })

            const { eventsIds } = req.body;

            if (!Array.isArray(eventsIds) || eventsIds.length === 0) {
                return res.status(400).json({ message: 'eventsIds must be a non-empty array' });
            }

            const results = [];

            for (const eventId of eventsIds) {
                const eventFound = await EventModel.findById(eventId);
                if (!eventFound) {
                    results.push({ eventId, message: 'event not found' })
                } else {
                    const eventDate = new Date(eventFound.date);
                    const mainDate = new Date(event.date);
                    let diferenceDays = Math.floor((eventDate - mainDate) / (1000 * 60 * 60 * 24));
                    if (diferenceDays <= 0){
                        diferenceDays = `${diferenceDays} days ago`
                    } else {
                        diferenceDays = `${diferenceDays} days in future (compared to ${event.name})`
                    }
                    results.push({
                        id : eventFound.id,
                        name: eventFound.name,
                        date: datesUtils.ptbrDate(eventDate),
                        diferenceDays: diferenceDays
                    });
                }
            }
            res.json({ mainEvent: `${event.name} | ${event.date} `, comparisons: results});

        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async create(req, res) {
        try {
            const { name, date, description } = req.body;
            if (!name || !date) {
                return res.status(400).json({ message: 'name and date are required' });
            }
            const eventCreated = await EventModel.create({ name, date, description });
            return res.status(201).json({ message: 'event added', event: eventCreated });
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const eventUpdated = await EventModel.update(id, req.body);
            if (!eventUpdated) return res.status(404).json({ message: 'event not found' });
            return res.json({ message: 'event updated', event: eventUpdated });
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async remove(req, res) {
        try {
            const id = Number(req.params.id);
            const eventDeleted = await EventModel.remove(id);
            if (!eventDeleted) return res.status(404).json({ message: 'event not found' });
            return res.json({ message: 'event deleted', event: eventDeleted });
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async usersIntoEvent(req, res) {
        try {
            const eventId = Number(req.params.id);
            const event = await EventModel.findById(eventId);
            if (!event) return res.status(404).json({ message: 'event not found' });

            const { usersIds } = req.body;

            if (!Array.isArray(usersIds) || usersIds.length === 0) {
                return res.status(400).json({ message: 'usersIds must be a non-empty array' });
            }

            for (const userId of usersIds) {
                const userFound = await UserModel.findById(userId);
                if (!userFound) { return res.status(404).json({ message: `user with id ${userId} not found` }) }
            }

            const processed = await EventModel.usersIntoEvent(eventId, { usersIds });
            return res.json({
                message: 'Users processed',
                event,
                users: processed
            });

        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async getUsersFromEvent(req, res) {
        const eventId = Number(req.params.id);
        const event = await EventModel.findById(eventId);
        if (!event) return res.status(404).json({ message: 'event not found or dont have people associated' })

        try {
            const usersInEvent = await EventModel.getUsersFromEvent(eventId);
            return res.json({ message: usersInEvent })
        }
        catch (err) {
            return res.status(500).json({ message: 'internal error', detais: err.message })
        }
    },

    async returnRemove(req, res) {
        return res.json({ message: 'you must specify the id to be deleted, use -> /events/id' })
    }
}