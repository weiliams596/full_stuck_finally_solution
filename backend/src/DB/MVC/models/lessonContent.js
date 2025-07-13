const {DataTypes} = require('sequelize');
const sequelize = require('../../configer');

const LessonContent = sequelize.define('LessonContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  content_type:{
    type: DataTypes.ENUM('video', 'text', 'image', 'audio','pdf','quiz'),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  videoUrl:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  quiz_data:{
    type: DataTypes.JSONB,
    allowNull: true,
  },
  order:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = LessonContent;