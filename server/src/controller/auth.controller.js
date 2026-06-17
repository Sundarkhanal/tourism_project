const bcrypt = require("bcryptjs")
const userService = require("../services/user.service")
class AuthController{

    register = (req, res, next) => {
        try {
            const data = userService.transformUserData(data)
            const user = userService.createUser(data)
            
            res.json({
                
                data: userService.getPublicUserProfile(user),
                message:"Register Now",
                status:"ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
}


module.exports = new AuthController()