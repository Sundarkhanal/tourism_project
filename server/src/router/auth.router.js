const authRouter = require("express").Router()
const authCtrl = require("../controller/auth.controller")
const validator = require("../middlewares/validator.middleware")
const {RegisterDTO, OTPVerifyDTO, LoginDTO} = require("../rules/auth.rule")
const checkPermission = require("../middlewares/auth.middleware")

authRouter.post("/register",validator(RegisterDTO), authCtrl.register)
authRouter.post("/activate-account", validator(OTPVerifyDTO),authCtrl.activateUser )
authRouter.post("/resend-activate-otp", validator(OTPVerifyDTO), authCtrl.resendActivationOTP)
authRouter.post("/login",validator(LoginDTO), authCtrl.login )
authRouter.get("/me",checkPermission(), authCtrl.getLoggedInuser )
authRouter.post("/forget-password", authCtrl.forgetPassword)
authRouter.post("/reset-password", authCtrl.resetPassword)
authRouter.post("/logout", checkPermission(), authCtrl.logout)


module.exports = authRouter