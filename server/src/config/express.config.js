const express = require("express")
const router = require("../router/router")
const errorHanlder = require("../middlewares/error-handler.middleware")
const mongoInitialize = require("../config/mangodb.config")
const app = express()

// body parser
app.use(express.json({
    limit: "5mb"
}))
app.use(express.urlencoded({
    limit: "5mb"
}))

mongoInitialize()
//static middleware
app.use("assets/", express.static('./public/uploads/'))

app.use("/api/v1", router)


//route globally undefined path or routes
app.use((req, res, next) => {
    next({
        code: 404,
        details: null,
        message: "Not Found",
        status:"NOT_FOUND_ERR"
    })
})

app.use(errorHanlder)



module.exports = app