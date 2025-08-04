const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        from:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        deleted_at:{
            type:DataTypes.DATE,
            allowNull:true,
            defaultValue: null
        }
    }, {
        tableName: 'patients',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    
    Patient.associate = models => {
        Patient.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        Patient.hasMany(models.Comment,{
            foreignKey: 'patient_id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        Patient.hasMany(models.OnlineQueue,{
            foreignKey: 'patient_id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
    };

    return Patient;
};