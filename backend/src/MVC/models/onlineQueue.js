const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    const OnlineQueue = sequelize.define('OnlineQueue', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        iller_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'patients',
                key: 'id'
            }
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM('waiting','accepted','rejected'),
            allowNull: false,
            defaultValue: 'waiting'
        },
        start_time:{
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        count_of_patient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        tableName: 'online_queue',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
        indexes: [
            { fields: ['iller_id'] },
            { fields: ['doctor_id'] },
            { fields: ['status'] }
        ]
    });

    OnlineQueue.associate = (models) => {
        OnlineQueue.belongsTo(models.Patient, {
            foreignKey: 'iller_id'
        });
        OnlineQueue.belongsTo(models.Doctor, {
            foreignKey: 'doctor_id'
        });
    };

    return OnlineQueue;
};