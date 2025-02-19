const projects = require('../Model/projectModel')


// add projects
exports.addProjectController = async(req,res)=>{
    console.log(`inside add project controller`);

    const {title,language,github,website,overview} = req.body
    console.log(title,language,github,website,overview);
    
    const projectImage = req.file.filename
    console.log(projectImage);

    const userId = req.payload

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json(`Project already exists`)
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(`Project adding failed due to ${error}`)
    }
}


// get all projects
exports.getAllProjects = async(req , res)=>{

    const searchKey = req.query.search
    console.log(searchKey);
    const query ={
        language:{
            $regex: searchKey , $options : "i"
        }
    }

    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
    }
}


// get admin projects
exports.getAdminProjectController = async(req , res)=>{
    try {
        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete admin project
exports.deleteAdminProjectController = async(req , res)=>{
    const {id} = req.params
    try {
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json('Project Deleted Succesfully') 
     } catch (error) {
         res.status(401).json(error)
     }
}

// update admin project
exports.updateAdminProjectCotroller = async(req , res)=>{
    const {id}= req.params

    const {title,language,github,website,overview,projectImage} =req.body
    uploadImage = req.file ? req.file.filename : projectImage

    try {
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage:uploadImage,
        },{new:true})

        await existingProject.save()
        res.status(200).json(existingProject)

    } catch (error) {
        res.status(401).json(error)
    }

}