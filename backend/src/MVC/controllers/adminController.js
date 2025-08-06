const { User, Hospital, Doctor } = require('../models/index');
const Response = require('../../utils/Response');


const adminController = {
  async activeUsers(req, res) {
    try {
      const { id } = req.apiQuery;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json(Response(404, 'Қолданушы табылмады'));
      }
      if (user.role !== 'admin') {
        return res.status(403).json(Response(403, 'Рұқсат жоқ'));
      }

      const { activeList } = req.apiQuery;

      if (Array.isArray(activeList) && activeList.every(us => 'id' in us)) {
        const users = await User.findAll({ where: { status: 'inactive' } });
        const activeUsers = [];

        for (const aUser of activeList) {
          const targetUser = users.find(ius => ius.id === aUser.id);
          if (targetUser) {
            await targetUser.update({ status: 'active' });
            activeUsers.push(targetUser);
          }
        }

        return res.status(200).json(Response(200, 'Сәтті өзгерілді!', null, { activeUsers }));
      } else {
        const [updatedCount] = await User.update({ status: 'active' }, { where: { status: 'inactive' } });
        return res.status(200).json(Response(200, 'Барлық қолданушылар активтелді!', null, { count: updatedCount }));
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json(Response(500, 'Барлық қолданушыларды активациялау үшін қатеболды!', e));
    }
  },
  async getDeletingUsers(req, res) {
    try {
      const { id } = req.apiQuery;
      const admin = await User.findByPk(id);
      if (!admin) {
        return res.status(404).json(Response(404, 'Қолданушы табылмады'));
      }
      if (admin.role !== 'admin') {
        return res.status(403).json(Response(403, 'Рұқсат жоқ'));
      }
      const users = await User.findAll({ where: { status: 'deleted' } });
      if (users.length === 0) {
        return res.status(404).json(Response(404, 'Қолданушылар табылмады'));
      }
      return res.status(200).json(Response(200, 'Қолданушыларды өшіргілімдерін жинау', null, { users }));
    } catch (e) {
      console.error(e);
      return res.status(500).json(Response(500, 'Қолданушылар өшірілгендер алу жұйесы қате болды!', e));
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.apiQuery;
      const admin = await User.findByPk(id);
      if (!admin) {
        return res.status(404).json(Response(404, 'Қолданушы табылмады'));
      }
      if (admin.role !== 'admin') {
        return res.status(403).json(Response(403, 'Рұқсат жоқ'));
      }

      const { del_id } = req.apiQuery;
      const user = await User.findByPk(del_id);
      if (!user) {
        return res.status(404).json(Response(404, 'Қолданушы табылмады'));
      }
      if (user.status !== 'deleted') {
        return res.status(403).json(Response(403, 'Қолданушыны өшіру қүқық жоқ!'));
      }
      await user.destroy();
      return res.status(200).json(Response(200, 'Қолданушы өшірілді!'));
    } catch (e) {
      console.error(e);
      return res.status(500).json(Response(500, 'Қолданушы өшіру үшін қате болды!', e));
    }
  },
  async createHospital(req, res) {
    try {
      const { id, name, code, address, city, description } = req.apiQuery;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json(Response(404, 'Қолданушы табылмады'));
      }
      if (user.role !== 'admin') {
        return res.status(403).json(Response(403, 'Рұқсат жоқ: Администратор ғана рұқсат етілген'));
      }

      if (!name || !code || !address || !city || !description) {
        return res.status(400).json(Response(400, 'Барлық өрістер толтырылуы керек'));
      }

      const newHospital = await Hospital.create({
        name,
        code,
        address,
        city,
        description
      });
      
      return res.status(201).json(Response(201, 'Аурухана сәтті құрылды', null, { hospital: newHospital }));
    } catch (error) {
      console.error('Hospital creation error:', error);
      return res.status(500).json(Response(500, 'Аурухана құру кезінде қате болды', error));
    }
  },
  async deleteHospital(req, res) {
    try {
      const { id } = req.apiQuery;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json(Response(404, 'Қолданушы табылмады'));
      }
      if (user.role !== 'admin') {
        return res.status(403).json(Response(403, 'Рұқсат жоқ'));
      }

      const { hospital_id } = req.apiQuery;
      const hospital = await Hospital.findByPk(hospital_id);
      if (!hospital) {
        return res.status(404).json(Response(404, 'Аурухана табылмады'));
      }
      await hospital.destroy();
      return res.status(200).json(Response(200, 'Аурухана өшірілді!'));
    } catch (e) {
      console.error(e);
      return res.status(500).json(Response(500, 'Аурухана өшіру үшін қате болды!', e));
    }
  },
  async getHospitals(req, res) {
    try {
      const { id } = req.apiQuery;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json(Response(404, 'Қолданушы табылмады'));
      }
      if (user.role !== 'admin') {
        return res.status(403).json(Response(403, 'Рұқсат жоқ'));
      }

      const hospitals = await Hospital.findAll();
      return res.status(200).json(Response(200, 'Ауруханалар жинау', null, { hospitals }));
    } catch (e) {
      console.error(e);
      return res.status(500).json(Response(500, 'Ауруханалар жинау үшін қате болды!', e));
    }
  },
  async deleteHospitals(req, res) {
    try {
      const { id, hospital_ids } = req.apiQuery;
      const admin = await User.findByPk(id);
      if (!admin || admin.role !== 'admin') {
        return res.status(403).json(Response(403, 'Рұқсат жоқ'));
      }

      if (!Array.isArray(hospital_ids) || hospital_ids.length === 0) {
        return res.status(400).json(Response(400, 'Аурухана тізімі бос немесе дұрыс емес'));
      }

      const deleted = await Hospital.destroy({
        where: { id: hospital_ids }
      });

      return res.status(200).json(Response(200, 'Ауруханалар өшірілді!', null, { count: deleted }));
    } catch (e) {
      console.error(e);
      return res.status(500).json(Response(500, 'Ауруханаларды өшіру кезінде қате болды!', e));
    }
  },
};

module.exports = adminController;