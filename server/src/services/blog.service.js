const BlogModel = require("../models/blog.model")

class BlogService{
    createBlog = async(data) => {
        try {
            const createdBlog = new BlogModel(data)
            await createdBlog.save()
            return createdBlog
            
        } catch (exception) {
            console.log(exception);
            
            throw{
                code: 422,
                message:"Blog cannot be registered at the momemt"
            }
        }
    }

    getPublicBlogData = (blogObj) => {
        const {_id, description, image, user_id} = blogObj
        return{
            _id, description, image, u_id:user_id._id
        }
    }

    listAllBlogs = async() => {
        try {
            const data = await BlogModel.find().populate("user_id", "_id name").sort({createdAt: "desc"})
            return data
        } catch (exception) {
            console.log(exception);
            
            throw{
                code: 500,
                message:"Error Fetching Blogs",
                status:"INTERNAL_SERVER_ERR"
            }
        }
    }

    getSingleRow = async(filter) => {
        try {
            const data = await BlogModel.findById(filter).populate("user_id", ['_id',"name"])
            return data
        } catch (exception) {
            throw exception
        }
    }

    updateSingleBlog = async(filter, data) => {
        try {
            const updatedData = await BlogModel.findOneAndUpdate(filter, {$set: data}, {new: true})
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

    deleteSingleBlog = async(filter) => {
        try {
            const deletedBlog = await BlogModel.findOneAndDelete(filter)
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

module.exports = new BlogService()