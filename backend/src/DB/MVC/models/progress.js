const {DataTypes} = require('sequelize');
const sequelize = require('../../configer');
const Lessons = require('./lessons');
const Students = require('./students');

const Progress = sequelize.define('Progress', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },completed:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    completed_at:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    score:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive','deleted'),
        allowNull: false,
    }
},{
    tableName: 'progress'
});

Progress.belongsTo(Lessons, {
    foreignKey: 'lesson_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Lessons.hasMany(Progress,{
    foreignKey: 'lesson_id'
})

Progress.belongsTo(Students, {
    foreignKey:'student_id'
});
Students.hasMany(Progress,{
    foreignKey:'student_id'
});

module.exports = Progress;