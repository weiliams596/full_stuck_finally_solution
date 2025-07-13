const { DataTypes } = require('sequelize');
const sequelize = require('../../configer');
const Lessons = require('./lessons');

const Teachers = sequelize.define('Teachers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted'),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'teachers'
});

Lessons.belongsTo(Teachers, {
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Teachers.hasMany(Lessons, {
    foreignKey: 'teacher_id'
});

module.exports = Teachers;
