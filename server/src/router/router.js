const authRouter = require("./auth.router")
const blogRouter = require("./blog.router")
const destinationRouter = require("./destination.router")
const favouritesRouter = require("./favourites.router")
const newsRouter = require("./news.router")
const reviewRouter = require("./review.router")

const router = require("express").Router()

router.use("/auth",authRouter)
router.use("/blog",blogRouter )
router.use("/news", newsRouter)
router.use("/destination", destinationRouter)
router.use("/favourites", favouritesRouter)
router.use("/review", reviewRouter )

module.exports = router