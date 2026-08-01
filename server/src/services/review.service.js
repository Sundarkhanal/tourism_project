const ReviewModel = require("../models/review.model")
class ReviewService{
    saveReview = async(data) => {
        try {
            const savedData = new ReviewModel(data)
            await savedData.save()
            return savedData
        } catch (exception) {
            console.log(exception);
            
            throw{
                code: 422,
                message:"Review cannot be sumbitted at the moment",
                status:"REVIEW_SUBMIT_ERR"
            }
        }
    }

    allReviews = async() => {
        try {
            const allReviewData = await ReviewModel.find().populate("user_id", "name").sort({createdAt: "desc"})
            return allReviewData
        } catch (exception) {
            throw{
                code: 500,
                message:"Error Fetching Reviews",
                status:"INTERNAL_SERVER_ERR"
            }
        }
    }
    getPublicReviewData = (reviewObj) => {
        const {user_id, location, rating, review_text, _id, createdAt, updatedAt, __v} = reviewObj
        return{
            name: user_id.name, location, rating, review_text
        }
    }
}



module.exports = new ReviewService