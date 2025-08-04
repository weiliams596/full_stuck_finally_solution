const Joi = require('joi');

const userName = Joi.string().pattern(/^([a-zA-Z\u0400-\u04FF\u0456\u049B\u04AF\u04B0\u04A1\u04E9\u04BB\u04B3\u04D9\u04A3\u04B7\u04F3\u04F9\u04F1\u04BD\u04BF\u04C3\u04C8\u04C7\u04F5\u04F7\u04FA\u04FB\u4E00-\u9FFF]+)[ \t]([a-zA-Z\u0400-\u04FF\u0456\u049B\u04AF\u04B0\u04A1\u04E9\u04BB\u04B3\u04D9\u04A3\u04B7\u04F3\u04F9\u04F1\u04BD\u04BF\u04C3\u04C8\u04C7\u04F5\u04F7\u04FA\u04FB\u4E00-\u9FFF]+)$/)
    .min(3).max(50).messages({
        'string.base': 'Username түрінде енгізіңіз!',
        'string.empty': 'Username бос қалтыруға болмайды!',
        'string.min': 'Username ды 3 орынды таңбадан көп қылып жазу керек!',
        'string.max': 'Username ды 50 орынды таңбадан азқылып жазу керек!',
        'any.required': 'Username сөзсіз жазылуы керек!'
    });

const password = Joi.string().min(8).max(35).messages({
    'string.base': 'Құпия сөз түрінде енгізіңіз!',
    'string.empty': 'Құпия сөз бос қалтыруға болмайды!',
    'string.min': 'Құпия сөз ды 8 орынды цифрланған нан көп қылып жазу керек!',
    'string.max': 'Құпия сөз ды 35 орынды цифрланған азқылып жазу керек!',
    'any.required': 'Құпия сөз сөзсіз жазылуы керек!'
});

const confirmPassword = Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Құпия сөздер  қайталау  сәйкес келмейді',
    'any.required': 'Құпия сөзді  қайталау  растау қажет',
});

const email = Joi.string().email().messages({
    'string.base': 'Email түрінде енгізіңіз!',
    'string.empty': 'Email бос қалтыруға болмайды!',
    'string.min': 'Email ды 3 орынды таңбадан көп қылып жазу керек!',
    'string.max': 'Email ды 50 орынды таңбадан азқылып жазу керек!',
    'any.required': 'Email сөзсіз жазылуы керек!'
});

const role = Joi.string().valid('admin', 'iller', 'doctor').messages({
    'string.base': 'Role түрінде енгізіңіз!',
    'string.empty': 'Role бос қалтыруға болмайды!',
    'any.required': 'Role сөзсіз жазылуы керек!'
});

const comment_required = Joi.string().min(1).max(255).messages({
    'string.base': 'Емхана түрінде енгізіңіз!',
    'string.empty': 'Емхана бос қалтыруға болмайды!',
    'string.min': 'Емхана ды 3 орынды таңбадан көп қылып жазу керек!',
    'string.max': 'Емхана ды 50 орынды таңбадан азқылып жазу керек!',
    'any.required': 'Емхана сөзсіз жазылуы керек!'
}).required();

const comment_point_required = Joi.string().min(5).max(255).messages({
    'string.base': 'Емхана әдіріс түрінде енгізіңіз!',
    'string.empty': 'Емхана әдіріс бос қалтыруға болмайды!',
    'string.min': 'Емхана әдіріс ды 3 орынды таңбадан көп қылып жазу керек!',
    'string.max': 'Емхана әдіріс ды 50 орынды таңбадан азқылып жазу керек!',
    'any.required': 'Емхана әдіріс сөзсіз жазылуы керек!'
}).required();

const comment_status_required = Joi.string().valid('active', 'deleted').messages({
    'string.base': 'Емхана әдіріс түрінде енгізіңіз!',
    'string.empty': 'Емхана әдіріс бос қалтыруға болмайды!',
    'string.min': 'Емхана әдіріс ды 3 орынды таңбадан көп қылып жазу керек!',
    'string.max': 'Емхана әдіріс ды 50 орынды таңбадан азқылып жазу керек!',
    'any.required': 'Емхана әдіріс сөзсіз жазылуы керек!'
}).required();

const userNameRequired = userName.required();
const passwordRequired = password.required();
const confirmPasswordRequired = confirmPassword.required();
const emailRequired = email.required();

const registerSchema = Joi.object({
    username: userNameRequired,
    password: passwordRequired,
    confirmPassword: confirmPasswordRequired,
    email: emailRequired,
    role: role.required()
});


const loginSchema = Joi.object({
    email: emailRequired,
    password: passwordRequired
});

const customerSchema = (cutomerJois = []) => {
    const schema = {};
    customerJois.forEach(joi => {
        schema[joi.key] = joi.joi;
    });
    return Joi.object(schema);
}


module.exports = {
    fileds: {
        userName,
        password,
        confirmPassword,
        email,
        userNameRequired,
        passwordRequired,
        confirmPasswordRequired,
        emailRequired,
        comment_required,
        comment_point_required,
        comment_status_required,
    },
    registerSchema,
    loginSchema,
    customerSchema
};