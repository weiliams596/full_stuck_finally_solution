const sequelize = require('../../DB/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const jwt= sequelize.define('jwt_tokens', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        jwt_token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'jwt_tokens'
    });

    return jwt;
};