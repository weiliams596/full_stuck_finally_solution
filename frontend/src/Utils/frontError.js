
const defaultMessagesKK = {
    400: 'Сұраныс қате немесе дұрыс емес форматта',
    401: 'Аутентификация қажет',
    403: 'Рұқсат жоқ',
    404: 'Ресурс табылмады',
    405: 'Рұқсат етілмеген сұраныс әдісі',
    408: 'Сұраныс уақыты аяқталды',
    409: 'Қайшылық пайда болды',
    429: 'Сұраныс тым жиі жіберілді',
    500: 'Ішкі сервер қатесі',
    502: 'Жарамсыз шлюз',
    503: 'Қызмет уақытша қолжетімсіз',
    504: 'Шлюз уақыты аяқталды',
};

class FrontError extends Error {
    constructor(message,status, statusCode, details = {}, extras = {}) {
        super(message);
        this.name = "FrontError";
        this.message = message;
        this.stack = (new Error()).stack;
        this.status = status;
        this.statusCode = statusCode;
        this.details = details;
        this.extras = extras;
        this.isFrontError = true;
        this.isCustomError = true;
    }
    static get name() {
        return this.name;
    }
    static get message() {
        return this.message;
    }
    static get stack() {
        return (new Error()).stack;
    }
    static get status() {
        return 500;
    }
    static get statusCode() {
        return 500;
    }
    static get isFrontError() {
        return true;
    }
    static get isCustomError() {
        return true;
    }
    static get error() {
        return {
            status: this.status,
            statusCode: this.statusCode,
            error: defaultMessagesKK[this.statusCode] || 'Белгісіз қате',
            message: (message ? message : ''),
            ...(this.details ? { details } : {}),
            ...(Object.keys(this.extras).length ? this.extras : {}),
        };
    }
    static get details() {
        return {
            message: (message ? message : ''),
            ...(this.details ? { details } : {}),
            ...(Object.keys(this.extras).length ? this.extras : {}),
        }
    }
};

export default FrontError;


