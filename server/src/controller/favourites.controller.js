const newsRouter = require("../router/news.router")
const favouritesService = require("../services/favourites.service")

class FavoriteController{
    createFavourite = async(req, res, next) => {
        try {
            const user_id = req.loggedInUser._id;
            const destId = req.params.destId;

            const favoriteData = {
                user_id: user_id,
                destination_id: destId
            };
            
            const data = await favouritesService.saveFavorite(favoriteData)
            res.json({
                data:data,
                status : "Ok"
            })
        } catch (exception) {
            console.log(exception);
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