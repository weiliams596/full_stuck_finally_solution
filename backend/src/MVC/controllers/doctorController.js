const { User, Doctor, Comment, Hospital } = require('../models/index');

const Response = require('../../utils/Response');


const doctorController = {
    async createDoctor(req, res) {

        try {
            const { user_id, hospital_id, description, major, work_status } = req.apiQuery;
            if (!user_id || !hospital_id || !description || !major || !work_status) {
                return res.status(400).json(Response(400, 'Бағдарламалар толық емес!'));
            }
            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(404).json(Response(404, 'Қолданушы табылмады!'));
            }
            const hospital = await Hospital.findByPk(hospital_id);
            if (!hospital) {
                return res.status(404).json(Response(404, 'Емхана табылмады!'));
            }
            const newDoctor = await Doctor.create({ user_id, hospital_id, description, major, work_statu });
            return res.status(201).json({ message: 'Сәтті жасалды!', doctor: newDoctor });
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Дауалаушы қосылуы қате!'));
        }
    },
    async getAllDoctors(req, res) {
        try {
            const { id } = req.apiQuery;
            if (id) {
                const admin = await User.findByPk(id);
                if (admin && admin.role === 'admin') {
                    const doctors = await User.findAll({
                        where: {
                            role: 'doctor',
                        },
                        include: [
                            {
                                module: Doctor,
                                attributes: [['description', 'doctor_description'], 'major', 'work_status'],
                            },
                            {
                                model: Comment,
                                attributes: ['comment', 'comment_point', 'status'],
                            }
                        ]
                    });
                    return res.status(200).json({ message: 'Дауалаушыларды алу сәтті болды!', doctors });
                }
            }

            const doctors = await User.findAll({
                where: {
                    role: 'doctor',
                    status: 'active'
                },
                include: [
                    {
                        module: Doctor,
                        attributes: [['description', 'doctor_description'], 'major', 'work_status'],
                    },
                    {
                        model: Comment,
                        attributes: ['comment', 'comment_point', 'status'],
                    }
                ]
            });
            return res.status(200).json({ message: 'Дауалаушыларды алу сәтті болды!', doctors });
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Дауалаушыларды алуы қате!'));
        }
    },
    async getDoctor(req, res) {
        try {
            const { doctor_id } = req.apiQuery;
            const doctor = await User.findOne({
                where: {
                    id: doctor_id,
                    role: 'doctor',
                include: [
                    {
                        module: Doctor,
                        attributes: [['description', 'doctor_description'], 'major', 'work_status'],
                    },]
                }
            });
            if (!doctor) {
                return res.status(404).json(Response(404, 'Дауалаушы табылмады!'));
            }
            return res.status(200).json({ message: 'Дауалаушы тізімі болды!', doctor });
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Дауалаушы тізімі қате!'));
        }
    },
    async updateDoctor(req, res) {
        try {
            const {id,doctor_id,hospital_id,description,major,work_status } = req.apiQuery;
            if (!id || !doctor_id || !hospital_id || !description || !major || !work_status) {
                return res.status(400).json(Response(400, 'Бағдарламалар толық емес!'));
            }
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json(Response(404, 'Қолданушы табылмады!'));
            }
            user.status = 'inactive';
            await user.save();
            const doctor = await Doctor.findByPk(doctor_id);
            if (!doctor) {
                return res.status(404).json(Response(404, 'Дауалаушы табылмады!'));
            }
            const hospital = await Hospital.findByPk(hospital_id);
            if (!hospital) {
                return res.status(404).json(Response(404, 'Емхана табылмады!'));
            }
            await doctor.update({
                hospital_id,
                description,
                major,
                work_status,
            });
            return res.status(200).json({ message: 'Дауалаушы тізімін сәтті өзгертілді!', doctor });
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Дауалаушы тізімін сәтті өзгертілуы қате!'));
        }
    },
};

module.exports = doctorController;