const Users = require('../models/users');
const Students = require('../models/students');
const Teachers = require('../models/teachers');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({ where: { status: { ne: 'deleted' } } });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { show_name, email, phone, password, role, image, status ,name} = req.body;
        const user = await Users.create({
            show_name,
            email,
            phone,
            password,
            role,
            image,
            status,
        });
        if(role ==='student'){
            const student = await Students.create({
                name:name,
                user_id: user.id,
            });
        }
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { uid, show_name, email, phone, password, role, image, status } = req.body;
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.uid = uid;
        user.show_name = show_name;
        user.email = email;
        user.phone = phone;
        user.password = password;
        user.role = role;
        user.image = image;
        user.status = status;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = 'deleted';
        res.status(204).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};