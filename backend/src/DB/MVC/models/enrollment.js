const { DataTypes } = require('sequelize');
const sequelize = require('../../configer');
const Students = require('./students');
const Courses = require('./courses');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    enrolled_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'denied'),
        defaultValue: 'pending'
    }
}, {
    tableName: 'enrollments'
});

Students.belongsToMany(Courses, { through: Enrollment });
Courses.belongsToMany(Students, { through: Enrollment });

module.exports = Enrollment;