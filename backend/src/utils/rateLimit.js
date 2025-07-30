const rateLimit = require("express-rate-limit");

/*
    1. `maxRequests` - Maximum number of requests allowed in the time window.
    2. `timeWindow` - Time window in minutes for which the limit is applied.(in seconds)

 */

const makeLimiter = (maxRequests=10, timeWindow=180) => {
    return rateLimit({
        windowMs: timeWindow * 1000, // `${timeWindow} minutes`
        max: maxRequests, // `limit each IP to ${maxRequests} requests per windowMs`
        message: `Сіз тім көп сұраныс жасадіңіз , ${timeWindow} сиконіт күте тұрыңыз!`,
        statusCode: 429 // `return 429 Too Many Requests response`
    });
};

module.exports = makeLimiter;