const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.url).then(()=>{
    console.log('connected to database successfully')

})