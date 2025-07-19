const sequelize = require('../../DB/db');
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
    return Patient;
};