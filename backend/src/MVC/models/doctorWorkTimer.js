const sequelize = require('../../DB/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const DoctorWorkTimer = sequelize.define('DoctorWorkTimer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
    }, {
        tableName: 'doctor_work_timer'
    });
    return Queue;
};