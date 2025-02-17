// import express
const express = require('express')

// import projectController
const projectController = require('./Controller/projectController')

// import multer
const multerConfig = require('./Middleware/multerMiddleware')

// instance router
const router = new express.Router()


// add project
router.post('/add-project',multerConfig.single("projectImage"),projectController.addProjectController)


module.exports = router