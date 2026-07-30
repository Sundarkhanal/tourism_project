const favouritesRouter = require("express").Router()
const checkPermission = require("../middlewares/auth.middleware")
const favouriteCtrl = require("../controller/favourites.controller")


favouritesRouter.post("/:destId", checkPermission(), favouriteCtrl.createFavourite )
favouritesRouter.get("/all-favorites", checkPermission(), favouriteCtrl.getAllFavourites)



module.exports = favouritesRouter