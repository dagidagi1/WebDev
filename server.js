const express = require('express')
const bodyParser = require('body-parser')
const mongoose =  require('mongoose')
const postRouter = require('./routes/postRoutes')
const dotenv = require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', err => {console.eroor(err)})
db.once('open', ()=> {console.log('connected to mongo!')})

app.use('/pub', express.static('public'))
app.use('/post', postRouter)

module.exports = app