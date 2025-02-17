// import multer
const multer = require('multer')

// diskStorage -> The disk storage engine gives you full control on storing files to disk
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./Uploads')
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now}-${file.originalname}`
        callback(null,filename)
    }
})

// file filter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('Only png,jpeg,jpg files are allowed'))
    }
}

// multer configuration
const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig