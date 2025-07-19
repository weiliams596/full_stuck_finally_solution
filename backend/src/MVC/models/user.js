const sequelize = require('../../DB/db');
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
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_type: {
            type: DataTypes.ENUM('doctor', 'iller', 'admin'),
            allowNull: false,
            defaultValue:'iller'
        },
        status:{
            type: DataTypes.ENUM('active', 'inactive','deleted'),
            allowNull: false,
            defaultValue:'active'
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