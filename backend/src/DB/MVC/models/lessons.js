const {DataTypes} = require('sequelize');
const sequelize = require('../../configer');

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
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    status:{
        type: DataTypes.ENUM('active', 'inactive','deleted'),
        allowNull: false,
    },
    price:{
        type:DataTypes.FLOAT,
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

module.exports = Lessons;