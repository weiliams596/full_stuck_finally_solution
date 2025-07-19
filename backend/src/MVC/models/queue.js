const sequelize = require('../../DB/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Queue = sequelize.define('Queue', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doctor_id: {
            ype: DataTypes.INTEGER,
            allowNull: false
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'queue'
    });
    return Queue;
};