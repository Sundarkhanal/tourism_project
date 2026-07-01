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

    getDetailById = async(req, res, next) => {
        try {
            const id = req.params.blogId
            let filter = {
                _id: id
            }
            const data = await blogService.getSingleRow(filter)
            if (!data) {
                throw{
                    code: 404,
                    message:"Blog Not found",
                    status:"NOT_FOUND_ERR"
                }
            }
            res.json({
                data: data,
                message:"Blog Detail",
                status:"Ok"
            })
        } catch (exception) {
            next(exception)
        }
    }
}


module.exports = new BlogController()