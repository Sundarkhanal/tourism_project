const authRouter = require("express").Router()
const authController = require("../controller/auth.controller")
const authCtrl = require("../controller/auth.controller")
const validator = require("../middlewares/validator.middleware")
const {RegisterDTO, OTPVerifyDTO, LoginDTO} = require("../rules/auth.rule")

authRouter.post("/register",validator(RegisterDTO), authCtrl.register)
authRouter.post("/activate-account", validator(OTPVerifyDTO),authCtrl.activateUser )
authRouter.post("/resend-activate-otp", validator(OTPVerifyDTO), authCtrl.resendActivationOTP)
authRouter.post("/login",validator(LoginDTO), authCtrl.login )


module.exports = authRouter