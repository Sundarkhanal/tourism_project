const destinationRouter = require("express").Router()
const validator = require("../middlewares/validator.middleware")
const checkPermission = require("../middlewares/auth.middleware")
const uploader = require("../middlewares/uploader.middleware")
const destinationCtrl = require("../controller/destination.controller")
const { DestinationDTO, DestinationUpdateDTO } = require("../rules/destination.rule")

destinationRouter.post("/create-destinations",checkPermission("admin"),uploader().single("image"),validator(DestinationDTO),destinationCtrl.createDestination);

destinationRouter.get("/all-destinations", destinationCtrl.listAllDestinations);

destinationRouter.get("/:destId", destinationCtrl.getDetailById);

destinationRouter.put("/update/:destId",checkPermission("admin"),uploader().single("image"),validator(DestinationUpdateDTO),destinationCtrl.updateDestination);

destinationRouter.delete(
    "/delete/:destId",
    checkPermission("admin"),
    destinationCtrl.deleteDestination
);

module.exports = destinationRouter;

