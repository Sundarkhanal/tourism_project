const reviewRouter = require("express").Router()
const checkPermission = require("../middlewares/auth.middleware")
const validator = require("../middlewares/validator.middleware")
const { ReviewDTO } = require("../rules/review.rule")
const reviewCtrl = require("../controller/review.controller")

reviewRouter.post("/create-review", checkPermission(), validator(ReviewDTO), reviewCtrl.createReview)
reviewRouter.get("/all-reviews", reviewCtrl.getAllReviews)
reviewRouter.delete("/:reviewId",checkPermission(),  reviewCtrl.deleteReviewById )





module.exports = reviewRouter