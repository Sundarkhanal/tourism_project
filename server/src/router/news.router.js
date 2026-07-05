const validator = require("../middlewares/validator.middleware")
const checkPermission = require("../middlewares/auth.middleware")
const uploader = require("../middlewares/uploader.middleware")
const newsCtrl = require("../controller/news.controller")
const { NewsDTO, NewsUpdateDTO } = require("../rules/news.rule")
const newsRouter = require("express").Router()


newsRouter.post("/create-news",checkPermission(),uploader().single("image"), validator(NewsDTO), newsCtrl.createNews)
newsRouter.get("/all-news", newsCtrl.listAllNews)
newsRouter.put("/update-news/:newsId", checkPermission(), uploader().single("image"), validator(NewsUpdateDTO), newsCtrl.updateNews )
newsRouter.delete("/delete/:newsId", checkPermission(), newsCtrl.deleteNews)



module.exports = newsRouter