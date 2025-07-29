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
        }
    }, {
        tableName: 'patient'
    });
    
    Patient.associate = models => {
        models.User.hasOne(
            Patient, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onchanges: 'CASCADE'
        });
        Patient.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };

    return Patient;
};