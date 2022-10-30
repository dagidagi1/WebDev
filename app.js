const express = require('express')
const app = express()
const dotenv = require('dotenv').config()

const mongoose =  require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', err => {console.eroor(err)})
db.once('open', ()=> {console.log('connected to mongo')})


const postRouter = require('./routes/postRoutes')
app.use('/post', postRouter)

app.listen(process.env.PORT, ()=>{
    console.log('Server Started!')
})