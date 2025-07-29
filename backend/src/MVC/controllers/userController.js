const { User } = require('../models/index');

const errorResponse = require('../../utils/errorResponse');


const userController = {
    async changeRole(req,res){
        try{
            const { id, role } = req.body;
            const user = await User.findByPk(id);
            if(!user){
                return res.status(404).json({message:'User not found'});
            }
            user.role = role;
            await user.save();
            return res.status(200).json({message:'Role changed successfully'});
        }catch(err){
            return res.status(500).json({message:err.message});
        }
    }
};

module.exports = userController;