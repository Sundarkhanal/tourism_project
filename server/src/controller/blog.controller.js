const blogService = require("../services/blog.service")

class BlogController{
    createBlog = async(req, res, next) => {
        try {
            const data = req.body
            console.log(data);
            
            if (req.file) {
                data.image = req.file.filename
            }
            data.user_id = req.loggedInUser._id
            const blogData = await blogService.createBlog(data)

            res.json({
                data: blogService.getPublicBlogData(blogData),
                message:"Blog Created Successfully!",
                status:"Ok"
            })
            
        } catch (exception) {
            console.log(exception);
            next(exception)
        }
    }

    listAllBlogs = async(req, res, next) => {
        try {
            const blogs = await blogService.listAllBlogs()

            res.json({
                data:blogs,
                message:"Blogs fetched Successfully",
                status:"ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }

    getDetailById = (req, res, next) => {
        try {
            
        } catch (exception) {
            next(exception)
        }
    }
}


module.exports = new BlogController()