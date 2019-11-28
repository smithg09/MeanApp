/*
    Author : Smith Gajjar
    Title : Mean App
    Description : This is Sample Mean application Using Express , ejs , mongodb.
    last-Updated : 28th November 2019 10:38 PM   
    
*/

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// Server Initialization
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts') 

// Import routes 
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books') 
// const searchRouter = require('./routes/index') 

const bodyParser = require('body-parser')
// Set paths & and usage
    app.set('view engine', 'ejs')
    app.set('views', __dirname + '/views')
    app.set('layout', 'layouts/layout')
    app.use(expressLayouts)
    app.use(express.static('public'))
    // app.use()
    app.use(bodyParser.urlencoded({limit: '10mb' , extended:false}))

// Database Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected to Mongodb')) 

// Routes Setup
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
    

    app.listen(process.env.PORT || 3000)