const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        hospital_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hospitals',
                key: 'id'
            }
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
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'doctors',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
        indexes: [
            { fields: ['user_id'] },
            { fields: ['hospital_id'] },
            { fields: ['work_status'] }
        ]

    });

    Doctor.associate = models => {
        Doctor.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        Doctor.belongsTo(models.Hospital, {
            foreignKey: 'hospital_id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'

        });
        Doctor.hasMany(models.Comment, {
            foreignKey: 'doctor_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Doctor.hasMany(models.OnlineQueue, {
            foreignKey: 'doctor_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Doctor;
};