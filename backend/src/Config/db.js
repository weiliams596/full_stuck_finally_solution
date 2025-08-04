const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('postgresql://full_stuck_final_db_user:ytI3D0a5EBnNRkUidtCbYBYBB9kkOcZY@dpg-d287ipripnbc739ei5hg-a.oregon-postgres.render.com/full_stuck_final_db', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // 可选：关闭 SQL 日志
  dialectOptions:{
    ssl:{
      require:true,
      rejectUnauthorized:false
    }
  },
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;