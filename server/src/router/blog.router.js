const validator = require("../middlewares/validator.middleware")
const checkPermission = require("../middlewares/auth.middleware")
const { BlogDTO, BlogUpdateDTO } = require("../rules/blog.rule")
const blogCtrl = require("../controller/blog.controller")
const uploader = require("../middlewares/uploader.middleware")

const blogRouter = require("express").Router()


blogRouter.post("/create-blog",checkPermission(),uploader().single("image"), validator(BlogDTO),blogCtrl.createBlog)
blogRouter.get("/all-blogs", blogCtrl.listAllBlogs)
blogRouter.get("/:blogId", blogCtrl.getDetailById)
blogRouter.put("/update-blog/:blogId", checkPermission(), uploader().single("image"), validator(BlogUpdateDTO), blogCtrl.updateBlog )
blogRouter.delete("/delete/:blogId", checkPermission(), blogCtrl.deleteBlog)



module.exports = blogRouter