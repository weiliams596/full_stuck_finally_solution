const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const RealTimeQueue = sequelize.define('RealTimeQueue', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        queue_created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        queue_updated_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
    },{
        tableName: 'RealTimeQueue',
        timestamps: true,
    });

    RealTimeQueue.associate = (models) => {
        RealTimeQueue.belongsTo(models.Comment, {
            foreignKey: 'comment_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

    };
    return RealTimeQueue;
};