const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const RealTimeQueue = sequelize.define('RealTimeQueue', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'comments',
                key: 'id'
            }
        },
        queue_index:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        queue_count:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        queue_code:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'A'
        },
        queue_status:{
            type:DataTypes.ENUM('waiting','started','completed'),
            allowNull: false,
            defaultValue: 'waiting'
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },{
        tableName: 'real_time_queue',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    RealTimeQueue.associate = (models) => {
        RealTimeQueue.hasOne(models.Comment, {
            foreignKey: 'comment_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return RealTimeQueue;
};

