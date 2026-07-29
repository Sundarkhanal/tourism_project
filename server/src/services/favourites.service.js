
const FavoriteModel = require("../models/favorite.model")
class FavoriteService {
    saveFavorite = async(data) => {
        try {
            const existingData = await FavoriteModel.findOne(data)
            if (existingData) {
                await FavoriteModel.findByIdAndDeleteI(existingData._id)

                return{
                    favorite: false,
                    message:"Destination removed from Favorites"
                }
            }

            const savedData = new FavoriteModel(data)
            await savedData.save()
            return {
                favorite: true,
                message:"Destination Added to favourites Successfully!"
            }
            
        } catch (exception) {   
            throw exception
        }
    }

    getAllFavourites = async() => {
        try {
            const allFavourites = await FavoriteModel.find().populate("dest_id", "name, image")
            return allFavourites
        } catch (exception) {
            throw exception
        }
    }
}




module.exports = new FavoriteService()