const destinationService = require("../services/destination.service");

class DestinationController {

    createDestination = async (req, res, next) => {
        try {
            const data = req.body;

            if (req.file) {
                data.image = req.file.path;
            }

            // Transform latitude & longitude into GeoJSON
            data.location = {
                type: "Point",
                coordinates: [
                    Number(data.longitude),
                    Number(data.latitude)
                ]
            };

            delete data.latitude;
            delete data.longitude;

            const destinationData = await destinationService.createDestination(data);

            res.json({
                data: destinationService.getPublicDestinationData(destinationData),
                message: "Destination Created Successfully!",
                status: "Ok"
            });

        } catch (exception) {
            console.log(exception);
            next(exception);
        }
    };

    listAllDestinations = async (req, res, next) => {
        try {
            const {search, category} = req.query
            const destinations = await destinationService.listAllDestinations(search, category);

            res.json({
                data: destinations.map(destination =>
                    destinationService.getPublicDestinationData(destination)
                ),
                message: "Destinations fetched Successfully",
                status: "Ok"
            });

        } catch (exception) {
            next(exception);
        }
    };

    getDetailById = async (req, res, next) => {
        try {

            const id = req.params.destId;

            const filter = {
                _id: id
            };

            const data = await destinationService.getSingleRow(filter);

            if (!data) {
                throw {
                    code: 404,
                    message: "Destination Not Found",
                    status: "NOT_FOUND_ERR"
                };
            }

            res.json({
                data: destinationService.getPublicDestinationData(data),
                message: "Destination Detail",
                status: "Ok"
            });

        } catch (exception) {
            next(exception);
        }
    };

    updateDestination = async (req, res, next) => {
        try {

            const id = req.params.destId;
            const data = req.body;

            if (req.file) {
                data.image = req.file.path;
            }

            if (data.latitude && data.longitude) {
                data.location = {
                    type: "Point",
                    coordinates: [
                        Number(data.longitude),
                        Number(data.latitude)
                    ]
                };

                delete data.latitude;
                delete data.longitude;
            }

            const filter = {
                _id: id
            };

            const updatedData = await destinationService.updateSingleDestination(filter, data);

            if (!updatedData) {
                throw {
                    code: 404,
                    message: "Destination Not Found",
                    status: "NOT_FOUND_ERR"
                };
            }

            res.json({
                data: destinationService.getPublicDestinationData(updatedData),
                message: "Destination Updated Successfully!",
                status: "Ok"
            });

        } catch (exception) {
            next(exception);
        }
    };

    deleteDestination = async (req, res, next) => {
        try {

            const id = req.params.destId;

            const filter = {
                _id: id
            };

            const deletedDestination = await destinationService.deleteSingleDestination(filter);

            if (!deletedDestination) {
                throw {
                    code: 404,
                    message: "Destination Not Found",
                    status: "NOT_FOUND_ERR"
                };
            }

            res.json({
                message: "Destination Deleted Successfully!",
                status: "Ok"
            });

        } catch (exception) {
            next(exception);
        }
    };

}

module.exports = new DestinationController();