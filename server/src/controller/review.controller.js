const reviewService = require("../services/review.service")

class ReviewController{
    createReview = async(req, res, next) => {
        try {
            const data = req.body
            data.user_id = req.loggedInUser._id

            const reviewData = await reviewService.saveReview(data)
            res.json({
                data: reviewData,
                message: "Review Submitted Successfully!",
                status:"Ok"
            })

            
        } catch (exception) {
            console.log(exception);
            
            next(exception)
        }
    }

    getAllReviews = async(req, res, next) => {
        try {
            const allReviews = await reviewService.allReviews()
            res.json({
                data: allReviews.map(review => reviewService.getPublicReviewData(review)) ,
                message:"All reviews fetched successfully!",
                status:"Ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
}


module.exports = new ReviewController