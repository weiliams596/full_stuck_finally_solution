const {DataTypes} = require('sequelize');
const sequelize = require('../../configer');
const LessonContent = require('./lessonContent');

const Lessons = sequelize.define('Lessons', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive','deleted'),
        allowNull: false,
    },
    price:{
        type:DataTypes.FLOAT,
        defaultValue:0.0,
        allowNull:false,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    order:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
    updated_at:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
    deleted_at:{
        type:DataTypes.DATE,
        allowNull:true,
    }
},{
    tableName: 'lessons',
});

LessonContent.belongsTo(Lessons, {
    foreignKey: 'lesson_id'
});
Lessons.hasMany(LessonContent, {
    foreignKey: 'lesson_id',
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
});

module.exports = Lessons;