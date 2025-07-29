const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('doctor', 'iller', 'admin','null'),
            allowNull: false,
            defaultValue:'null'
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'default.jpg'
        },
        status:{
            type: DataTypes.ENUM('active', 'inactive','deleted'),
            allowNull: false,
            defaultValue:'inactive'
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        update_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'users'
    });
    return User;
};