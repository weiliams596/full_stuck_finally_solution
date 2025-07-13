const { DataTypes } = require('sequelize');
const sequelize = require('../../configer');
const Teachers = require('./teachers');
const Students = require('./students');
const LoginInfomation = require('./loginInfomation');
const Courses = require('./courses');

const Users = sequelize.define('Users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uid:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    show_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive','deleted'),
        defaultValue: 'inactive',
        allowNull: false,
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    deleted_at:{
        type: DataTypes.DATE,
        allowNull: true,
    },
},{
    tableName: 'users'
});

Teachers.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Users.hasMany(Teachers, {
    foreignKey: 'userId',
});

Students.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Users.hasMany(Students, {
    foreignKey: 'userId',
});

LoginInfomation.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Users.hasMany(LoginInfomation, {
    foreignKey: 'userId',
});

Courses.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Users.hasMany(Courses, {
    foreignKey: 'userId',
});

module.exports = Users;