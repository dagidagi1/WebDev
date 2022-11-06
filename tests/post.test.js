const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')
const Post = require('../models/post_model')

const newPostMessage = 'test message'
const newPostSender = 'tester'

beforeAll(async ()=>{
    await Post.remove()
})


afterAll(async ()=> {
    await Post.remove()
    mongoose.connection.close()
})

describe("Post Tests:",()=> {

    
    test("(2)add new post", async() =>{
        const response = await request(app).post('/post').send({
            "message": newPostMessage,
            "sender": newPostSender
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
    })
    test("(1)get all posts", async() =>{
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
    })

})






describe("Init test 1:",()=> {
    test("(1)add new post", async() =>{
        const temp = 2
        expect(temp).toEqual(2)
    })
    test("(2)add new post", async() =>{
        const temp = 2
        expect(temp).toEqual(2)
    })
    test("(3)add new post", async() =>{
        const temp = 2
        expect(temp).toEqual(2)
    })
    test("(4)add new post", async() =>{
        const temp = 2
        expect(temp).toEqual(2)
    })
})