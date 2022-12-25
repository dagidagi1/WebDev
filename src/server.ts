import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import postRouter from './routes/postRoutes'
import authRouter from './routes/authRoutes'
import dotenv from 'dotenv'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import http from 'http'



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
if (process.env.NODE_ENV == "development") {
    const options = {
    definition: {
    openapi: "3.0.0",
    info: {
    title: "Library API",
    version: "1.0.0",
    description: "A simple Express Library API",
    },
    servers: [{url: "http://localhost:3000",},],
    },
    apis: ["./src/routes/*.ts"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    }
    const server = http.createServer(app)
export = server