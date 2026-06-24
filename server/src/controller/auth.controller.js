const { appConfig } = require("../config/config")
const emailService = require("../services/email.service")
const userService = require("../services/user.service")
const randomStringGenerator = require("../utilities/hepler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
class AuthController{

    //we don't have to return using private variable
    #userDetail
    async #validateUserExistsByEmail(email){
        this.#userDetail = await userService.getSingleUserProfile({
            email: email
            })
        if (!this.#userDetail) {
                throw{
            code: 400,
            details:{
                email:"Email is not resgistered yet"
            },
            message:"User Not Found",
            status:"USER_NOT_REGISTERED_ERR"
            }
        }
    }
    register = async(req, res, next) => {
        try {
            const data = userService.transformUserData(req)
            const user = await userService.createUser(data)
            await emailService.sendEmail({
                to: user.email,
                subject: "Activate your Account",
                message:userService.getActivateYourAccountMessage({name:user.name, otp:user.otp})

            })
            
            res.json({
                data: userService.getPublicUserProfile(user),
                message:"User Registered Successfully!",
                status:"ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }

    activateUser = async(req, res, next) => {
        try {
            const {email, otp} = req.body
            await this.#validateUserExistsByEmail(email)
            if(this.#userDetail.status === "active"){
                throw{
                    code: 422,
                    message:"Profile Already Activated",
                    status:"ALREADY_ACTIVATED_ACCOUNT_ERR"
                }
            }
            if(this.#userDetail.otp !== otp){
                throw{
                    code: 400,
                    details:{
                        otp:"Incorrect OTP Code"
                    },
                    message:"OTP Not Matched",
                    status:"OTP_NOT_MATCH_ERR"
                }
            }
            const OTPExpiryTime = this.#userDetail.expiryTime.getTime()
            const currentTime = Date.now();

            if(OTPExpiryTime < currentTime){
                throw{
                    code:400,
                    details:{otp:"OTP Expired"},
                    message:"OTP Expired",
                    status:"OTP_EXPIRED_ERR"
               
                }
            }
            const update = await userService.updateSingleUserProfile({
                _id: this.#userDetail._id,
            }, {
                otp:null,
                expiryTime: null,
                status:"active"
            })
            res.json({
                data:userService.getPublicUserProfile(update),
                message:"Your Account Activated Successfully!",
                status:"ok"
            })

        } catch (exception) {
            console.log(exception);
            
            next(exception)
        }
    }

    resendActivationOTP = async(req, res, next) => {
        try {
            const {email, otp} = req.body
            const userDetail = await userService.getSingleUserProfile({
                email: email,
                otp:otp
            })
            if (!userDetail) {
                throw{
                    code: 404,
                    message:"User Not Found",
                    status:"USER_NOT_FOUND_ERR"
                }
            }

            if(userDetail.otp !== otp){
                throw{
                    code: 400,
                    details:{
                        otp:"Incorrect OTP Code"
                    },
                    message:"OTP Not Matched",
                    status:"OTP_NOT_MATCH_ERR"
                }
            }
            const OTPExpiryTime = userDetail.expiryTime.getTime()
            const currentTime = Date.now();

            if(OTPExpiryTime >= currentTime){
                throw{
                    code:400,
                    details:{otp:"OTP Not Expired"},
                    message:"OTP Not Expired",
                    status:"OTP_NOT_EXPIRED_ERR"
               
                }
            }
            const data = {
                otp: randomStringGenerator(6),
                expiryTime: new Date(Date.now() + 600000)
            }
            const update = await userService.getSingleUserProfile({
                _id: userDetail._id,
            }, {
                data
            });
            await emailService.sendEmail({
                to: userDetail.email,
                subject:"Re-OTP Code",
                message:userService.getResentActivationOTPCode({name: userDetail.name, otp:userDetail.otp})
                
            })
            res.json({
                data:userService.getPublicUserProfile(update),
                message:"An email has been sent to your registered Account!",
                status:"ok"
            })

        } catch (exception) {
            console.log(exception);
            
            next(exception)
        }
    }
    login = async(req, res, next) => {
        try {
            const {email, password} = req. body
            await this.#validateUserExistsByEmail(email)

            if(this.#userDetail.status === "inactive"){
                throw{
                    code: 422,
                    message:"User not Activated yet...",
                    status:"USER_NOT_ACTIVATED_ERR"
                }
            }
            if(!bcrypt.compareSync(password, this.#userDetail.password)){
                throw{
                    code:422,
                    message:"Credentials doesn't match",
                    status:"INVALID_CREDENTIALS_ERR"
                }
            }
            const token = jwt.sign({sub:this.#userDetail._id}, appConfig.jwtSecret, {expiresIn:"1d"})
            res.cookie("Authorization", "Bearer "+token, {maxAge:24*60*60*1000, httpOnly: true})
            res.json({
                data: token,
                message:"You are loggedIn",
                status:"ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }



}


module.exports = new AuthController()