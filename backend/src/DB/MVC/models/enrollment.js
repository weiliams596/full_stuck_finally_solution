const { DataTypes } = require('sequelize');
const sequelize = require('../../configer');

const Enrollment = sequelize.define('Enrollment', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    enrolled_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status:{
        type:DataTypes.ENUM('pending', 'approved', 'denied'),
        defaultValue: 'pending'
    }
},{
    tableName: 'enrollments'
});