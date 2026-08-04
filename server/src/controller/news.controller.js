const newsService = require("../services/news.service")
const CHATBOT_SERVICE_URL = process.env.CHATBOT_SERVICE_URL
const axios = require("axios")

/**
 * Helper function to send news data to the Python Chatbot for Qdrant Vector indexing.
 * Runs in the background without blocking Express HTTP responses.
 */
const syncNewsToQdrant = async (newsData) => {
    if (!newsData || !newsData._id) return;

    try {
        const response = await axios.post(`${CHATBOT_SERVICE_URL}/api/rag/ingest-news`, {
            news_id: newsData._id.toString(),
            title: newsData.title,
            description: newsData.description,
            location: newsData.location,
            publisherName: newsData.publisherName || "Admin"
        });
        console.log(`[Qdrant Sync Success] News Indexed: "${newsData.title}"`);
    } catch (err) {
        console.error(`[Qdrant Sync Error] Failed to index news:`, err.message);
    }
};

/**
 * Helper function to delete news vector from Qdrant using async/await and try/catch.
 */
const deleteNewsFromQdrant = async (newsId) => {
    try {
        const response = await axios.delete(`${CHATBOT_SERVICE_URL}/api/rag/delete-news/${newsId}`);
        console.log(`[Qdrant Delete Success] Vector deleted for ID: ${newsId}`);
    } catch (err) {
        console.error(`[Qdrant Delete Error] Failed to delete vector:`, err.message);
    }
};

class NewsController{
    createNews = async(req, res, next) => {
        try {
            const data = req.body
            
            if (req.file) {
                data.image = req.file.path
            }
            const newsData = await newsService.createNews(data)
            syncNewsToQdrant(newsData)

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
            syncNewsToQdrant(updatedData)

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
            const deletedNews = await newsService.deleteSingleNews(filter)
            if (!deletedNews) {
                throw {
                    code: 404,
                    message: "Blog not found.",
                    status: "NOT_FOUND_ERR"
                };
            }
            deleteNewsFromQdrant(id)

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