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

// get all projects
router.get('/all-project',projectController.getAllProjects)

// get admin projects
router.get('/admin-project',projectController.getAdminProjectController)

// remove admin project
router.delete('/remove-adminproject/:id',projectController.deleteAdminProjectController)

// update admin project
router.put('/update-adminProject/:id',multerConfig.single("projectImage"),projectController.updateAdminProjectCotroller)


module.exports = router