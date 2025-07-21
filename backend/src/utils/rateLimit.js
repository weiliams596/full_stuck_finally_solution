const rateLimit = require("express-rate-limit");

const makeLimiter = (maxRequests, timeWindow) => {
    return rateLimit({
        windowMs: timeWindow * 1000, // `${timeWindow} minutes`
        max: maxRequests, // `limit each IP to ${maxRequests} requests per windowMs`
        message: 'Сіз тім көп сұраныс жасадіңіз , 3 минут күте тұрыңыз!',
        statusCode: 429 // `return 429 Too Many Requests response`
    });
};

module.exports = makeLimiter;