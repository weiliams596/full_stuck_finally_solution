const { User } = require('../models/index');
const errorResponse = require('../../utils/errorResponse');

const UserController = {
    getUser: async function (req, res) {
        const { id } = req.apiQuery;
        try {
            if (!id) {
                const error = errorResponse(400, 'id жазылмаған!');
                return res.status(400).json(error);
            }

            const user = await User.findOne({ where: { id } });
            if (!user || user.status === 'deleted') {
                const error = errorResponse(404, 'қате қолданушы жоқ!');
                return res.status(404).json(error);
            }

            return res.status(200).json(user);
        } catch (e) {
            const error = { ...errorResponse(401), message: e.message, details: e.details };
            return res.status(401).json(error);
        }
    },
    getUsers: async function (req, res) {
        const { name, email } = req.apiQuery;
        try {
            const where = {};
            if (name) {
                where.name = { [Op.like]: `%${name}%` };
            }
            if (email) {
                where.email = { [Op.like]: `%${email}%` };
            }
            where.status = { [Op.ne]: 'deleted' };

            const users = await User.findAll({ where });
            return res.status(200).json(users);
        } catch (e) {
            return res.status(401).json(errorResponse(401, e.message, e.details));
        }
    },
    createUser: async function (req, res) {
        const { name, email, password } = req.body;
        try {
            if (!name || !email || !password) {
                const error = errorResponse(400, 'name, email, password жазылмағаны!');
                return res.status(400).json(error);
            }

            const user = await User.create({ name, email, password });
            return res.status(201).json(user);
        } catch (e) {
            return res.status(401).json(errorResponse(401, e.message, e.details));
        }
    },
    updateUser: async function (req, res) {
        const { id } = req.apiQuery;
        const { name, email, password } = req.body;
        try {
            if (!id) {
                const error = errorResponse(400, 'id жазылмағаны!');
                return res.status(400).json(error);
            }

            const user = await User.findOne({ where: { id } });
            if (!user) {
                const error = errorResponse(404, 'қате құжат жоқ!');
                return res.status(404).json(error);
            }

            if (name) {
                user.name = name;
            }
            if (email) {
                user.email = email;
            }
            if (password) {
                user.password = password;
            }
            await user.save();
            return res.status(200).json(user);
        } catch (e) {
            return res.status(401).json(errorResponse(401, e.message, e.details));
        }
    },
    deleteUser: async function (req, res) {
        const { id } = req.apiQuery;
        try {
            if (!id) {
                const error = errorResponse(400, 'id жазылмағаны!');
                return res.status(400).json(error);
            }

            const user = await User.findOne({ where: { id } });
            if (!user) {
                const error = errorResponse(404, 'қате құжат жоқ!');
                return res.status(404).json(error);
            }
            user.status = 'deleted';
            await user.save();
            return res.status(204).json({ message: 'Сәтті жойылды!' });
        } catch (e) {
            return res.status(401).json(errorResponse(401, e.message, e.details));
        }
    }
};

module.exports = UserController;