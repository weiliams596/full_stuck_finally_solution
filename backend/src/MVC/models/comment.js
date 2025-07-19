const sequelize = require('../../DB/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, {
        tableName: 'comment'
    });
    return Comment;
};