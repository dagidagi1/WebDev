import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'

const newPostMessage = ['test message1','test message2']
const updatedPostMessage = 'updated message'
const wrongPostId = '111111'
const newPostSender = ['tester1','tester2']
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
    test("(1)add new post", async() =>{
        const response = await request(app).post('/post').send({
            "message": newPostMessage[0],
            "sender": newPostSender[0]
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[0])
        expect(response.body.sender).toEqual(newPostSender[0])
    })
    test("(1.1)add new post - second post", async() =>{
        const response = await request(app).post('/post').send({
            "message": newPostMessage[1],
            "sender": newPostSender[1]
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[1])
        expect(response.body.sender).toEqual(newPostSender[1])
        test_id = response.body._id
    })
    test("(2)Get all posts", async() =>{
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
    })
    test("(3)Get post by id", async() => {
        const response = await request(app).get('/post/'+ test_id)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[1])
        expect(response.body.sender).toEqual(newPostSender[1])
    })
    test("(3.0)Get post by id - invalid id", async() => {
        const response = await request(app).get('/post/'+ test_id)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage[1])
        expect(response.body.sender).toEqual(newPostSender[1])
    })
    test("(4)update post",async ()=>{
        let response = await request(app).put('/post/' + test_id).send({
            "message": updatedPostMessage,
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(updatedPostMessage)
        expect(response.body.sender).toEqual(newPostSender[1])

        response = await request(app).get('/post/' + test_id)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(updatedPostMessage)
        expect(response.body.sender).toEqual(newPostSender[1])
    })

    test("(4.0)update post - invalid id",async ()=>{
        let response = await request(app).put('/post/'+ wrongPostId).send({
            "message": updatedPostMessage,
            "sender": newPostSender[4]
        })
        expect(response.statusCode).toEqual(400)
    })
})
