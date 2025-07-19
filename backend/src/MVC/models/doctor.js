const sequelize = require('../../DB/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        major: {
            type: DataTypes.STRING,
            allowNull: true
        },
        work_status: {
            type: DataTypes.ENUM('working', 'vocation', 'other'),
            allowNull: false,
            defaultValue: 'vocatoin'
        }
    }, {
        tableName: 'doctors'
    });

    Doctor.associate = models => {
        models.User.hasOne(
            Doctor, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
        Doctor.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };
};