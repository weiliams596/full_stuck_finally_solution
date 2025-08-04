const sequelize = require('../../Config/db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('doctor', 'iller', 'admin'),
            allowNull: false,
            defaultValue:'iller'
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'default.jpg'
        },
        status:{
            type: DataTypes.ENUM('active', 'inactive','deleted'),
            allowNull: false,
            defaultValue:'inactive'
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return User;
};


module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'patients',
                key: 'id'
            },
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id'
            }
        },
        real_time_queue_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'real_time_queue',
                key: 'id'
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment_point: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: "Comment point must be an integer"
                },
                min: 0,
                max: 5
            },
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'deleted'),
            allowNull: false,
            defaultValue: 'active'
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'comments'
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Patient, {
            foreignKey: 'author_id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
        Comment.belongsTo(models.Doctor, {
            foreignKey: 'doctor_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };
    return Comment;
};

/**
 *const Doctor = require('./models/Doctor');
const Comment = require('./models/Comment');

const doctors = await Doctor.findAll({
  include: [{
    model: Comment,
    attributes: ['comment', 'comment_point', 'status'],
    include: [{
      model: User,
      attributes: [['name','author_name']] // 根据你的 Patient 模型字段选择
    }]
  }]
});

 */


module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        hospital_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hospitals',
                key: 'id'
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        major: {
            type: DataTypes.STRING,
            allowNull: true
        },
        work_status: {
            type: DataTypes.ENUM('working', 'vacation', 'other'),
            allowNull: false,
            defaultValue: 'vacation'
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'doctors',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Doctor.associate = models => {
        models.User.hasOne(
            Doctor, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Doctor.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };

    return Doctor;
};


module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define('Hospital', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'hospitals',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Hospital.associate = (models) => {
        Hospital.hasMany(models.Doctor, {
            foreignKey: 'hospital_id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        });
        models.Doctor.belongsTo(Hospital, {
            foreignKey: 'hospital_id'
        });
    };

    return Hospital;
}


module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        from:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        deleted_at:{
            type:DataTypes.DATE,
            allowNull:true,
            defaultValue: null
        }
    }, {
        tableName: 'patients',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    
    Patient.associate = models => {
        models.User.hasOne(
            Patient, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'

        });
        Patient.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    };

    return Patient;
};


module.exports = (sequelize, DataTypes) => {
    const RealTimeQueue = sequelize.define('RealTimeQueue', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'comments',
                key: 'id'
            }
        },
        queue_index:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        queue_count:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        queue_code:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'A'
        },
        queue_status:{
            type:DataTypes.ENUM('waiting','started','completed'),
            allowNull: false,
            defaultValue: 'waiting'
        },
        deleted_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },{
        tableName: 'real_time_queue',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    RealTimeQueue.associate = (models) => {
        RealTimeQueue.belongsTo(models.Comment, {
            foreignKey: 'comment_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return RealTimeQueue;
};