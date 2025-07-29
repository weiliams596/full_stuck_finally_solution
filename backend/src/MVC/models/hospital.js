const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define('Hospital', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'hospitals'
    });

    Hospital.associate = (models) => {
        Hospital.hasMany(models.Doctor, {
            foreignKey: 'hospital_id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
        models.Doctor.belongsTo(Hospital, {
            foreignKey: 'hospital_id'
        });
    };

    return Hospital;
}