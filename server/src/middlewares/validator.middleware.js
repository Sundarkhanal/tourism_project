const {ValidationError} = require("joi")
module.exports = (rules) => {
    return async(req, res, next) => {
        try {
            const data = req.body
            if (req.file) {
                data.image = req.file.path;
            }
            if (!data) {
                throw{
                    code: 422,
                    message: "Data Not Found",
                    status: "EMPTY_PAYLOAD_ERR"
                }
            }
            //it validates all fields and provides validation error at last
            await rules.validateAsync(data,{
                abortEarly: false
            })
            next()
        } catch (exception) {
            // console.log(exception)
            let response = exception
            if (response instanceof ValidationError) {
                response = {
                    details:{},
                    code: 400,
                    message:"Validation Failed",
                    status:"VALIDATION_FAILED_ERR"
                }
                exception.details.map((error) => {
                    console.log(error);
                    response.details[error.context.key] = error.message
                    
                    
                })
                
            }

            next(response)
        }
    }
}