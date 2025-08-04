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
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'hospitals',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Hospital.associate = (models) => {
        Hospital.hasMany(models.Doctor, {
            foreignKey: 'hospital_id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
    };

    return Hospital;
}
