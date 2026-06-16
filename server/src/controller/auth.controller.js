const bcrypt = require("bcryptjs")
const randomStringGenerator = require("../utilities/hepler")
class AuthController{

    register = (req, res, next) => {
        try {
            const data = req.body
            data.password = bcrypt.hashSync(data.password)
            data.emailVerified = false
            data.otp = randomStringGenerator(6).toUpperCase()
            res.json({
                
                data: data,
                message:"Register Now",
                status:"ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
}


module.exports = new AuthController()