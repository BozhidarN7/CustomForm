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
    console.log(message);
    res.status(statusCode).json({
        status,
        message,
    });
};
