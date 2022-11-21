import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import postRouter from './routes/postRoutes'
import authRouter from './routes/authRoutes'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL)//, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', err => {console.error(err)})
db.once('open', ()=> {console.log('connected to mongo!')})

app.use('/pub', express.static('public'))
app.use('/post', postRouter)
app.use('/auth', authRouter)
export = app