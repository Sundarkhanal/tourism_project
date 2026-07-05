const NewsModel = require("../models/news.model");

class NewsService{
    createNews = async(data) => {
        try {
            const createdNews = new NewsModel(data)
            await createdNews.save()
            return createdNews
            
        } catch (exception) {
            console.log(exception);
            
            throw{
                code: 422,
                message:"News cannot be created at the momemt"
            }
        }
    }

    getPublicNewsData = (blogObj) => {
        const {_id,title, description, location, publisherName, image } = blogObj
        return{
            _id,title, description, location, publisherName, image
        }
    }

    listAllNews = async() => {
        try {
            const data = await NewsModel.find().sort({createdAt: "desc"})
            return data
        } catch (exception) {
            console.log(exception);
            
            throw{
                code: 500,
                message:"Error Fetching News",
                status:"INTERNAL_SERVER_ERR"
            }
        }
    }

    updateSingleNews = async(filter, data) => {
        try {
            const updatedData = await NewsModel.findOneAndUpdate(filter, {$set: data}, {new: true})
            return updatedData;
        } catch (exception) {
            console.log(exception);
            
            throw{
                code: 500,
                message:exception.message ?? "Error Updating Blog...",
                status:"ERR_UPDATING_BLOG"
            }
        }
    }

    deleteSingleNews = async(filter) => {
        try {
            const deletedBlog = await NewsModel.findOneAndDelete(filter)
            return deletedBlog
        } catch (exception) {
            throw{
                code: 500,
                message: exception.message ?? "Error Deleting Blog...",
                status:"ERR_DELETING_BLOG"
            }
        }
    }
}

module.exports = new NewsService()