module.exports = (error, req, res, next) => {
    let code = error.code || 500;
    let details = error.details || error.detail || null
    let message = error.message || "App Error...."
    let status = error.status || "INTERNAL_APP_ERROR"

    if(code > 599){
        code = 500
    }

    res.status(code).json({
        error:details,
        message: message,
        status: status
    })
}