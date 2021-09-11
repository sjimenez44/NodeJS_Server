const statusMessages = {
    '200': 'Ok',
    '201': 'Created',
    '204': 'No content',
    '400': 'Invalid format',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not found',
    '406': 'Not acceptable',
    '500': 'Internal error'
}

exports.success = function (req, res, message, status) {
    let statusCode = status;
    let statusMessage = message;
    
    if (!status) {
        status = 200;
    }

    if (!message) {
        statusMessage = statusMessages[status];
    }

    res.status(statusCode).send({ 
        body: statusMessage
    });
}

//-- Realiza un formato para las respuestas erroneas
exports.error = function (req, res, message, status, details) {
    let statusMessage = message;
    
    if (!message) {
        statusMessage = statusMessages[status];
    }

    res.status(status || 500).send({ 
        error: { message, details }
    });
}