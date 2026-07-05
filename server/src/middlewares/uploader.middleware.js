const multer = require("multer")
const fs = require("fs")


const uploader = (type = 'image') => {

    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = "./public/uploads/"
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, {recursive: true})
            }
            cb(null, path)
        },
        filename: (req, file, cb) => {
            const filename = Date.now()+"-"+file.originalname
            cb(null, filename)
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