const sequelize = require('../../Config/db');
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
            type: DataTypes.ENUM('working', 'vacation', 'other'),
            allowNull: false,
            defaultValue: 'vacation'
        }
    }, {
        tableName: 'doctors'
    });

    Doctor.associate = models => {
        models.User.hasOne(
            Doctor, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onchanges: 'CASCADE'
        });
        Doctor.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };

    return Doctor;
};