const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary.config")


const uploader = (type = 'image') => {

    const storageConfig = new CloudinaryStorage({
        cloudinary:cloudinary,
        params: {
            folder:"minor_project",
            allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'bmp', 'webp', 'gif'],
            resource_type: type
        }
    })
    const customFileFilter = (req, file, cb) => {
        const ext = file.originalname.split(".").pop().toLowerCase()
        let allowedExts = ['jpg', 'jpeg', 'png', 'svg', 'bmp', 'webp', 'gif']

        if (allowedExts.includes(ext)) {
            cb(null, true)
        } else {
            cb({
                code: 422,
                message: "File Format Not Supported",
                status:"FILE_FORMAT_NOT_SUPPORTED_ERR"
            })
        }
    }
    return multer({
        storage: storageConfig,
        fileFilter: customFileFilter,
        limits: {
            fileSize: 5*1024*1024
        }
    })
}

module.exports = uploader