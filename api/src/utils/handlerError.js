function handlerError(error) {
    const error = {
        401: {
            code: 401,
            message: '',
            type: ''
        }
    }

    return error[error.code];

} 

module.exports = handlerError;