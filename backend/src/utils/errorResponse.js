// utils/errorResponse.js

function errorResponse(statusCode, message = null, details = null, extras = {}) {
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

  return {
    status: statusCode,
    error: defaultMessagesKK[statusCode] || 'Белгісіз қате',
    message: (message? '-:['+ message +']' : ''),
    ...(details ? { details } : {}),
    ...(Object.keys(extras).length ? extras : {}),
  };
}

module.exports = errorResponse;
