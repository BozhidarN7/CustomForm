module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.errors.username) {
        sendErrorResponse(
            res,
            err.statusCode,
            err.status,
            err.errors.username.message
        );
    } else if (err.errors.email) {
        sendErrorResponse(
            res,
            err.statusCode,
            err.status,
            err.errors.email.message
        );
    } else {
        sendErrorResponse(
            res,
            err.statusCode,
            err.status,
            'Something went wrong. Please try again'
        );
    }
};

const sendErrorResponse = function (res, statusCode, status, message) {
    res.status(statusCode).json({
        status,
        message,
    });
};
