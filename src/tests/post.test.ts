import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'
import User from '../models/user_model'

const newPostMessage = 'This is the new test post message'
let newPostSender = ''
let newPostId = ''
const newPostMessageUpdated = 'This is the updated message'

const userEmail = "user1@gmail.com"
const userPassword = "123456789"
let accessToken = ''
beforeAll(async () => {
    //await Post.remove()
    //await User.remove()

    const res = await request(app).post('/auth/register').send({
        "email": userEmail,
        "password": userPassword,
        "phone": 'newUserPhone',
        "name": 'newUserName',
        "img": 'newUserImg'
    })
    await loginUser()

    newPostSender = res.body._id
})

async function loginUser() {
    const response = await request(app).post('/auth/login').send({
        "email": userEmail,
        "password": userPassword
    })
    accessToken = response.body.accessToken
}

beforeEach(async () => {
    //await loginUser()
})

afterAll(async () => {
    //await Post.remove()
    await User.deleteOne({ email: userEmail })
    await Post.deleteOne({ _id: newPostId })
    mongoose.connection.close()
})

describe("Posts Tests", () => {
    test("add new post", async () => {
        const response = await request(app).post('/post').set('Authorization', 'JWT ' + accessToken)
            .send({
                "txt": newPostMessage,
                "usrId": newPostSender,
                "img": "zxc"
            })
        expect(response.statusCode).toEqual(200)
        expect(response.body.data.txt).toEqual(newPostMessage)
        expect(response.body.data.usrId).toEqual(newPostSender)
        newPostId = response.body.data._id
    })

    test("get all posts", async () => {
        const response = await request(app).get('/post').set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body.data[0].txt).toEqual(newPostMessage)
        expect(response.body.data[0].usrId).toEqual(newPostSender)
    })

    test("get post by id", async () => {
        const response = await request(app).get('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body.data.txt).toEqual(newPostMessage)
        expect(response.body.data.usrId).toEqual(newPostSender)

    })

    test("get post by wrong id fails", async () => {
        const response = await request(app).get('/post/12345').set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(400)
    })

    test("get post by sender", async () => {
        const response = await request(app).get('/post?sender=' + newPostSender).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body.data[0].txt).toEqual(newPostMessage)
        expect(response.body.data[0].usrId).toEqual(newPostSender)
    })

    test("update post by ID", async () => {
        let response = await request(app).put('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
            .send({
                params: {
                    "id": newPostId,
                    "txt": newPostMessageUpdated,
                    "imgUri": newPostSender,
                }
            })
        expect(response.statusCode).toEqual(200)

        response = await request(app).get('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body.data.txt).toEqual(newPostMessageUpdated)
        expect(response.body.data.usrId).toEqual(newPostSender)

        response = await request(app).put('/post/12345').set('Authorization', 'JWT ' + accessToken)
            .send({
                "txt": newPostMessageUpdated,
                "usrid": newPostSender
            })
        expect(response.statusCode).toEqual(400)

        response = await request(app).put('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
            .send({params: {
                "txt": newPostMessageUpdated,
            }})
        expect(response.statusCode).toEqual(200)
    })
})