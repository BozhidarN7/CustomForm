module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.code === 11000) {
        const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
        const message = `Duplicate field value: ${value}. Please use another value!`;
        sendErrorResponse(res, err.statusCode, err.status, message);
    } else if (err.errors && err.errors.username) {
        sendErrorResponse(
            res,
            err.statusCode,
            err.status,
            err.errors.username.message
        );
    } else if (err.errors && err.errors.email) {
        sendErrorResponse(
            res,
            err.statusCode,
            err.status,
            err.errors.email.message
        );
    } else if (err.isOperational) {
        sendErrorResponse(res, err.statusCode, err.status, err.message);
    } else {
        console.log(err);
    }
};

const sendErrorResponse = function (res, statusCode, status, message) {
    res.status(statusCode).json({
        status,
        message,
    });
};
