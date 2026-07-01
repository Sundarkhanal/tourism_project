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
            _id, description, image, user_id
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
}

module.exports = new BlogService()