const authRouter = require("./auth.router")
const blogRouter = require("./blog.router")

const router = require("express").Router()

router.use("/auth",authRouter)
router.use("/blog",blogRouter )

module.exports = router