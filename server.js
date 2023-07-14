require('./config/usersDB')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const authRouthes = require('./routes/userRoutes')
const recordRoutes= require('./routes/recordRoutes')
const port = 9098


const app = express()

app.use(express.json())

app.use(
    session({
    secret: process.env.SECRETE,
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    }
}))
app.use('/api', authRouthes)
app.use('/api', recordRoutes)

app.listen(port, ()=>{
    console.log(`app is connected to ${port}`)
})

