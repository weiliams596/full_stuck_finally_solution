const {DataTypes} = require('sequelize');
const sequelize = require('../../configer');
const Lessons = require('./lessons');

const Courses = sequelize.define('courses', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive','deleted'),
        allowNull: false,
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    deleted_at:{
        type: DataTypes.DATE,
        allowNull: true,
    },
},{
    tableName: 'courses',
});

Lessons.belongsTo(Courses, {
    foreignKey: 'course_id'
});
Courses.hasMany(Lessons,{
    foreignKey: 'course_id'
})

module.exports = Courses;