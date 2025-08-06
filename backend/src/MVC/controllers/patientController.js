const { User, Patient } = require('../models/index');

const Response = require('../../utils/Response');

const patientController = {
    async createPatient(req, res) {
        try {
            const { id, from, description, phone } = req.apiQuery;
            const user = await User.finByPk(id);
            if (!user) {
                return res.status(404).json(Response(404, 'Қолданушы табылмады!'));
            }
            const patient = await Patient.create({
                from,
                description,
                phone,
                user_id: id,
            });
            return res.status(201).json(Response(201, 'Сәтті қүрілді!', null, patient));
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Наухас жасалу қате!'));
        }
    },
    async getPaint(req, res) {
        try {
            const { id, patient_id } = req.apiQuery;
            let user = null;
            let patient = null;
            if (!id) {
                return res.status(400).json(Response(400, 'Маңызды ақрарат жоқ!'));
            }
            else {
                user = await User.finByPk(id);
                if (!user ||user?.status==='deleted') {
                    return res.status(404).json(Response(404, 'Қолданушы табылмады!'));
                }
            }
            if (!patient_id) {
                patient = await Patient.findOne({
                    where: {
                        user_id: id,
                    },
                });
            }
            else {
                patient = await Patient.finByPk(patient_id);
                if (!patient) {
                    return res.status(404).json(Response(404, 'Наухас табылмады!'));
                }
            }
            if (user.id !== patient.user_id) {
                return res.status(401).json(Response(401, 'Берылген ақрараттар қате!'));
            }
            return res.status(200).json(Response(200, 'Сәтті қүргі!', null, patient));
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Наухас алу қате!'));
        }
    },
    async updatePatient(req, res) {
        try {
            const { id, patient_id, from, description, phone } = req.apiQuery;
            const user = await User.finByPk(id);
            if (!user) {
                return res.status(404).json(Response(404, 'Қолданушы табылмады!'));
            }
            const patient = await Patient.finByPk(patient_id);
            if (!patient) {
                return res.status(404).json(Response(404, 'Наухас табылмады!'));
            }
            if (user.id !== patient.user_id) {
                return res.status(401).json(Response(401, 'Берылген ақрараттар қате!'));
            }
            await patient.update({
                from,
                description,
                phone,
            });
            return res.status(200).json(Response(200, 'Сәтті өзгертілді!', null, patient));
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Наухас жаңарту қате!'));
        }
    },
    async deletePatient(req, res) {
        try {
            const { id, patient_id } = req.apiQuery;
            if(!id || !patient_id){
                return res.status(400).json(Response(400, 'Маңызды ақрараттар жоқ!'));
            }
            const user = await User.finByPk(id);
            if (!user) {
                return res.status(404).json(Response(404, 'Қолданушы табылмады!'));
            }
            const patient = await Patient.finByPk(patient_id);
            if (!patient) {
                return res.status(404).json(Response(404, 'Наухас табылмады!'));
            }
            if (user.id !== patient.user_id) {
                return res.status(401).json(Response(401, 'Берылген ақрараттар қате!'));
            }
            await patient.destroy();
            user.status='deleted';
            await user.save();
            return res.status(200).json(Response(200, 'Сәтті сәттігін сәттілді!', null, patient));
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Наухас жою қате!'));
        }
    }
};