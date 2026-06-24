const jwt = require("jsonwebtoken")
const { appConfig } = require("../config/config")
const userService = require("../services/user.service")
module.exports = async(req, res, next) => {
    try {
        let token = req.cookies.Authorization ?? req.headers['authorization']
        if (!token) {
            throw{
                code: 401,
                message:"Not Authorized",
                status:"USER_NOT_AUTHORIZED_ERR"
            }
        }
        token  = token.replace("Bearer", "")
        const data = jwt.verify(token, appConfig.jwtSecret)
        const userDetail = await userService.getSingleUserProfile({_id: data.sub})
        req.loggedInUser = userService.getPublicUserProfile(userDetail)
        
    } catch (exception) {
        let errMsg = exception
        if(exception instanceof jwt.TokenExpiredError){
            errMsg['code'] = 401
            errMsg['status'] = "TOKEN_EXPIRED"
        } else if(exception instanceof jwt.JsonWebTokenError){
            errMsg['code'] = 401
            errMsg['status'] = "JWT_ERR"
        }
        next(errMsg)
    }
    
    
}