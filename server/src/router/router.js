const authRouter = require("./auth.router")
const blogRouter = require("./blog.router")
const newsRouter = require("./news.router")

const router = require("express").Router()

router.use("/auth",authRouter)
router.use("/blog",blogRouter )
router.use("/news", newsRouter)

module.exports = router