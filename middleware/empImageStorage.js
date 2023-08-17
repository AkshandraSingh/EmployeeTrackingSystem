const multer = require('multer'); 
const path = require('path'); 

const imageConfig = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, path.join(__dirname, "..", "/employee_app/upload"));
    },
    filename: (req, file, callback) => {
        var ext = file.originalname.substring(file.originalname.indexOf("."));
        callback(null, `image_${Date.now()}.${file.originalname}`)
    }
})
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback(new Error("Only images is valid .")) 
    }
}

const upload = multer({
    storage: imageConfig,
    fileFilter: isImage,
})

module.exports = {
    upload
}
