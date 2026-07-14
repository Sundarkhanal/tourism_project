const destinationRouter = require("express").Router()
const validator = require("../middlewares/validator.middleware")
const checkPermission = require("../middlewares/auth.middleware")
const uploader = require("../middlewares/uploader.middleware")

destinationRouter.post("/create",checkPermission(),uploader().single("image"),validator(DestinationDTO),destinationCtrl.createDestination);

destinationRouter.get("/", destinationCtrl.listDestination);

destinationRouter.get("/:id", destinationCtrl.getDetail);

destinationRouter.put("/:id",checkPermission(),uploader().single("image"),validator(DestinationDTO),destinationCtrl.updateDestination);

destinationRouter.delete(
    "/:id",
    checkPermission(),
    destinationCtrl.deleteDestination
);

module.exports = destinationRouter;

