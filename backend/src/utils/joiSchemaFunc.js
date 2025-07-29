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
    'string.base': 'Password түрінде енгізіңіз!',
    'string.empty': 'Password бос қалтыруға болмайды!',
    'string.min': 'Password ды 8 орынды цифрланған нан көп қылып жазу керек!',
    'string.max': 'Password ды 35 орынды цифрланған азқылып жазу керек!',
    'any.required': 'Password сөзсіз жазылуы керек!'
});

const confirmPassword = Joi.string().min(8).max(35).messages({
    'string.base': 'Confirm Password түрінде енгізіңіз!',
    'string.empty': 'Confirm Password бос қалтыруға болмайды!',
    'string.min': 'Confirm Password ды 8 орынды цифрланған нан көп қылып жазу керек!',
    'string.max': 'Confirm Password ды 35 орынды цифрланған азқылып жазу керек!',
    'any.required': 'Confirm Password сөзсіз жазылуы керек!'
});

const email = Joi.string().email().messages({
    'string.base': 'Email түрінде енгізіңіз!',
    'string.empty': 'Email бос қалтыруға болмайды!',
    'string.min': 'Email ды 3 орынды таңбадан көп қылып жазу керек!',
    'string.max': 'Email ды 50 орынды таңбадан азқылып жазу керек!',
    'any.required': 'Email сөзсіз жазылуы керек!'
});

const userNameRequired = userName.required();
const passwordRequired = password.required();
const confirmPasswordRequired = confirmPassword.required();
const emailRequired = email.required();

const registerSchema = Joi.object({
    username: userNameRequired,
    password: passwordRequired,
    confirmPassword: confirmPasswordRequired,
    email: emailRequired
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
        emailRequired
    },
    registerSchema,
    loginSchema,
    customerSchema
};