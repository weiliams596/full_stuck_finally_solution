const { User, Patient } = require('../models/index');

const Response = require('../../utils/Response');

const patientController = {
    async createPatient(req, res) {
        try {
            const {id,from ,description,phone} = req.apiQuery;
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
            return res.status(201).json({
                message: 'Жалпы жасалды!',
                patient,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(Response(500, 'Наухас жасалу қате!'));
        }
    },
    async getPaint(req,res){
        try{
            const {patient_id} = req.apiQuery;
            const patient = await Patient.findByPk(patient_id);
            if(!patient){
                return res.status(404).json(Response(404, 'Наухас табылмады!'));
            }
            return res.status(200).json(Response(200,'Сәтті алынды!',null,{patient:patient}));
        }catch(err){
            console.log(err);
            return res.status(500).json(Response(500, 'Наухас алу қате!'));
        }
    },
    
};