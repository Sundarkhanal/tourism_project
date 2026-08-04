const newsService = require("../services/news.service")

class NewsController{
    createNews = async(req, res, next) => {
        try {
            const data = req.body
            
            if (req.file) {
                data.image = req.file.path
            }
            const newsData = await newsService.createNews(data)

            res.json({
                data: newsService.getPublicNewsData(newsData),
                message:"News Created Successfully!",
                status:"Ok"
            })
            
        } catch (exception) {
            console.log(exception);
            next(exception)
        }
    }

    listAllNews = async(req, res, next) => {
        try {
            const allNews = await newsService.listAllNews()
            if(!allNews){
                throw{
                    code:404,
                    message:"News Not Found",
                    status:"NOT_FOUND_ERR"
                }
            }

            res.json({
                data: allNews.map(news => newsService.getPublicNewsData(news)),
                message:"News fetched Successfully",
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
    updateNews = async(req, res, next) => {
        try {
            const id = req.params.newsId
            
            const data = req.body
            if (req.file) {
                data.image = req.file.path
            }

            const filter = {
                _id: id
            }
            
            const updatedData = await newsService.updateSingleNews(filter, data)

            if (!updatedData) {
                throw {
                    code: 404,
                    message: "Blog not found.",
                    status: "NOT_FOUND_ERR"
                };
            }

            res.json({
                data: newsService.getPublicNewsData(updatedData),
                message:"News Updated Successfully!",
                status:"Ok"
            })


        } catch (exception) {
            next(exception)
        }
    }
    deleteNews = async(req, res, next) => {
        try {
            const id = req.params.newsId
            const filter = {
                _id: id
            }
            const deletedBlog = await newsService.deleteSingleNews(filter)
            if (!deletedBlog) {
                throw {
                    code: 404,
                    message: "Blog not found.",
                    status: "NOT_FOUND_ERR"
                };
            }

            res.json({
                message:"News Deleted Successfully!",
                status:"Ok"
            })
        } catch (exception) {
            next(exception)
        }
    }
}


module.exports = new NewsController()