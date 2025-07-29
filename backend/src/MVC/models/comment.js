const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment_point:{
            type: DataTypes.INTEGER,
            validators: {
                isInt: {
                    msg: "Comment point must be an integer"
                },
                min: 0,
                max: 5
            },
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM('active','deleted'),
            allowNull: false,
            defaultValue: 'active'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        tableName: 'comment'
    });

    Comment.associate = (models)=>{
        Comment.belongsTo(models.Patient,{
            foreignKey:'author_id',
            onDelete: 'SET NULL',
            onUpdate:'CASCADE'
        });
        Comment.belongsTo(models.Doctor,{
            foreignKey:'doctor_id',
            onDelete:'CASCADE',
            onUpdate:'CASCADE'
        });
    };
    return Comment;
};