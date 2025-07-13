const {DataTypes} = require('sequelize');
const sequelize = require('../../configer');

const LoginInfomation = sequelize.define('LoginInfomation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    loginDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loginIp:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    loginAt:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    loginLocation:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName: 'login_infomation',
});

module.exports = LoginInfomation;