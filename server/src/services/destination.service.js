const DestinationModel = require("../models/destination.model");

class DestinationService {

    createDestination = async (data) => {
        try {

            const createdDestination = new DestinationModel(data);
            await createdDestination.save();
            return createdDestination;

        } catch (exception) {

            console.log(exception);

            throw {
                code: 422,
                message: "Destination cannot be created at the moment",
                status: "CREATE_DESTINATION_ERR"
            };
        }
    };

    getPublicDestinationData = (destinationObj) => {

        const {
            _id,
            name,
            region,
            location,
            description,
            image,
            favorite
        } = destinationObj;

        return {
            _id,
            name,
            region,
            location,
            description,
            image,
            favorite
        };
    };

    listAllDestinations = async () => {
        try {

            const data = await DestinationModel.find().sort({
                createdAt: "desc"
            });

            return data;

        } catch (exception) {

            throw {
                code: 500,
                message: "Error Fetching Destinations",
                status: "INTERNAL_SERVER_ERR"
            };
        }
    };

    getSingleRow = async (filter) => {
        try {

            const data = await DestinationModel.findById(filter);

            return data;

        } catch (exception) {
            throw exception;
        }
    };

    updateSingleDestination = async (filter, data) => {
        try {

            const updatedData = await DestinationModel.findOneAndUpdate(
                filter,
                { $set: data },
                { new: true }
            );

            return updatedData;

        } catch (exception) {

            throw {
                code: 500,
                message: exception.message ?? "Error Updating Destination...",
                status: "ERR_UPDATING_DESTINATION"
            };
        }
    };

    deleteSingleDestination = async (filter) => {
        try {

            const deletedDestination = await DestinationModel.findOneAndDelete(filter);

            return deletedDestination;

        } catch (exception) {

            throw {
                code: 500,
                message: exception.message ?? "Error Deleting Destination...",
                status: "ERR_DELETING_DESTINATION"
            };
        }
    };

}

module.exports = new DestinationService();