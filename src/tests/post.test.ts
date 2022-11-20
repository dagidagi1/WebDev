import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'

const newPostMessage = ['test message1','test message2','test message3','test message4']
const newPostSender = ['tester1','tester2','tester3','tester4']
const newMessage = 'this is the new updated message'
let test_id = '0'
beforeAll(async ()=>{
    await Post.remove()
})


afterAll(async ()=> {
    await Post.remove()
    mongoose.connection.close()
})

describe("Post Tests:",()=> {
    test("(1.1)add new post", async() =>{
        const response = await request(app).post('/post').send({
            "message": newPostMessage[0],
            "sender": newPostSender[0]
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[0])
        expect(response.body.sender).toEqual(newPostSender[0])
    })
    test("(1.2)add new post", async() =>{
        const response = await request(app).post('/post').send({
            "message": newPostMessage[1],
            "sender": newPostSender[1]
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[1])
        expect(response.body.sender).toEqual(newPostSender[1])
    })
    test("(1.3)add new post", async() =>{
        const response = await request(app).post('/post').send({
            "message": newPostMessage[2],
            "sender": newPostSender[2]
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[2])
        expect(response.body.sender).toEqual(newPostSender[2])
    })
    test("(1.4)add new post", async() =>{
        const response = await request(app).post('/post').send({
            "message": newPostMessage[3],
            "sender": newPostSender[3]
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[3])
        expect(response.body.sender).toEqual(newPostSender[3])
        test_id = response.body._id
    })
    test("(2)Get all posts", async() =>{
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
    })
    test("(3)Get post by id", async() => {
        const response = await request(app).get('/post/'+ test_id)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[3])
        expect(response.body.sender).toEqual(newPostSender[3])
    })
    test("(4)update post", async() => {
        const response = await request(app).get('/post/'+ test_id)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[3])
        expect(response.body.sender).toEqual(newPostSender[3])
    })
})
