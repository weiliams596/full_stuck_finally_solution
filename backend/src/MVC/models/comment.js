const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'patients',
                key: 'id'
            },
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id'
            }
        },
        real_time_queue_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'real_time_queue',
                key: 'id'
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        comment_point: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: "Бағалау балл integer болуы керек"
                },
                min: 0,
                max: 5
            },
            allowNull: false
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'comments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
        indexes: [
            { fields: ['author_id'] },
            { fields: ['doctor_id'] }
        ]
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Patient, {
            foreignKey: 'author_id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
        Comment.belongsTo(models.Doctor, {
            foreignKey: 'doctor_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Comment.belongsTo(models.RealTimeQueue, {
            foreignKey:'real_time_queue_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };
    return Comment;
};

/**
 *const Doctor = require('./models/Doctor');
const Comment = require('./models/Comment');

const doctors = await Doctor.findAll({
  include: [{
    model: Comment,
    attributes: ['comment', 'comment_point', 'status'],
    include: [{
      model: User,
      attributes: [['name','author_name']] // 根据你的 Patient 模型字段选择
    }]
  }]
});

 */