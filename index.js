// import dotenv
require('dotenv').config()

// import connection
require('./connection')

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./router')

// create Server
const portfolioServer = express()

// server using cors
portfolioServer.use(cors())

// parse the data -> middleware to parse the data
portfolioServer.use(express.json())

// exporting upload folder
portfolioServer.use('/upload',express.static('./Uploads'))

// use router
portfolioServer.use(router)

// create PORT
const PORT = 4000 || process.env.PORT

// Listen PORT
portfolioServer.listen(PORT,()=>{
    console.log(`portfolioServer is running successfully at PORT ${PORT}`);
})

// // get 
portfolioServer.get('/',(req , res)=>{
    res.send('get request received')
})

