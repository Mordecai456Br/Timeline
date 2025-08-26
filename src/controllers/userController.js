const userModel = require('../models/userModel');

module.exports = {

    async findAll(req, res) {
        try {
            const users = await userModel.findAll();
            return res.json(users);
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async findById(req, res) {
        try {
            const id = Number(req.params.id);
            const user = await userModel.findById(id);

            if (!user) return res.status(404).json({ message: 'user not found' });
            return res.json(user);
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async create(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'name' });
            }
            const userCreated = await userModel.create({ name });
            return res.status(201).json({ message: 'user added', user: userCreated });
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const userUpdated = await userModel.update(id, req.body);
            if (!userUpdated) return res.status(404).json({ message: 'user not found' });
            return res.json({ message: 'user updated', user: userUpdated });
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async remove(req, res) {
        try {
            const id = Number(req.params.id);
            const userDeleted = await userModel.remove(id);
            if (!userDeleted) return res.status(404).json({ message: 'user not found' });
            return res.json({ message: 'user deleted', user: userDeleted });
        } catch (err) {
            return res.status(500).json({ message: "internal error", detail: err.message });
        }
    },

    async returnRemove(req, res) {
        return res.json({ message: 'you must specify the id to be deleted, use -> /user/id' })
    }

}