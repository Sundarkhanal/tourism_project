const newsRouter = require("../router/news.router")
const favouritesService = require("../services/favourites.service")

class FavoriteController{
    createFavourite = async(req, res, next) => {
        try {
            const user_id = req.loggedInUser.user_id
            const destId = req.params.destId
            const favoriteData = {
                user_id,
                destinationId: destId
            }
            
            const data = await favouritesService.saveFavorite(favoriteData)
            res.json({
                status : "Ok"
            })
        } catch (exception) {
            next(exception)
        }
    }


    getAllFavourites = async(req, res, next) => {
        try {
            const allFavourites = await favouritesService.getAllFavourites()

            res.json({
                data: allFavourites,
                message:"All Favorites Fetched Successfully!",
                status:"Ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
}

module.exports = new FavoriteController()