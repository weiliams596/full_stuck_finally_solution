const fs = require('fs');
const path = require('path');
const sequelize = require('../../Config/db');
const { Sequelize } = require('sequelize');

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

function loadModels(dir){
    fs.readdirSync(dir).forEach(file=>{
        const fullPath = path.join(dir, file);
        const state = fs.statSync(fullPath);
        
        if(state.isDirectory()){
            loadModels(fullPath);
        }else if(file.endsWith('.js') && file != 'index.js'){
            const model = require(fullPath)(sequelize,Sequelize.DataTypes);
            db[model.name] = model;
        }
    })
}

loadModels(__dirname);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
