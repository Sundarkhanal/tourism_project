const authRouter = require("express").Router()
const authCtrl = require("../controller/auth.controller")
const validator = require("../middlewares/validator.middleware")
const RegisterDTO = require("../rules/auth.rule")

authRouter.post("/register",validator(RegisterDTO), authCtrl.register)


module.exports = authRouter