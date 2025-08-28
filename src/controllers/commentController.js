const CommentModel = require('../models/commentModel');
const { findById } = require('./eventController');

module.exports = {

    async findAll(req, res){
        try {
            const comments = await CommentModel.findAll();
            return res.json(comments);

        } catch (err) {
            return res.status(500).json({message: "internal error", details: err.message});
        } 
    },

    async findById(req, res){
        try {
            const id = Number(req.params.id);
            const comment = await CommentModel.findById(id);
            if(!comment) { return res.status(404).json({message: 'comment not found'})}

            return res.json(comment);

        } catch (err) {
            return res.status(500).json({message: "internal error", details: err.message});
        } 
    },

    async create(req, res){
        try {
            const { comment, event_id, user_id } = req.body
            if(!event_id || user_id) return res.status(400).json({ message: 'event_id and user_id are required' });

            const commentCreated = await CommentModel.create({ comment, event_id, user_id })
            return res.status(201).json({message: "comment added", comment: comment})
        }
        catch (err) {
            return res.status(500).json({message: "internal error", details: err.message});
        } 
    },

    async update(req, res){
        try {
            const id = Number(req.params.id);
            const commentUpdated = await CommentModel.update(id, req.body);
            if(!commentUpdated) { return res.status(404).json({message: 'comment not found'})}

            return res.json({message: 'comment updated', comment: commentUpdated});
        }
        catch (err) {
            return res.status(500).json({message: "internal error", details: err.message});
        } 
    },

    async remove(req, res){
        try {
            const id = Number(req.params.id);
            const commentDeleted = await CommentModel.remove(id);
            if(!commentDeleted) { return res.status(404).json({ message: 'comment not found'})}
            
            res.json({ message: 'comment deleted', comment: commentDeleted});
        }
        catch (err) {
            return res.status(500).json({message: "internal error", details: err.message});
        } 
    },


}