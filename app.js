// import express
const express = require('express')
const morgan = require('morgan')

// import data

// import controllers
const menu_router = require('./controllers/menu_controller')
const admin_router = require('./controllers/admin_controller')

// init express App
const app = express()

// server info
const host = 'localhost'
const port = 8080

// init/assign middleware
app.use(morgan('combined'))
app.use(express.json())

// list endpoints
app.get('/', function (req, res){
    res.json({
        host: host,
        port: port
    })
})

// init routes
app.use('/menu', menu_router)
app.use('/admin', admin_router)

// contoh init handler yang menggunakan class
app.listen(port, host, () => {
    console.log(`server running on: http://${host}:${port}`)
})