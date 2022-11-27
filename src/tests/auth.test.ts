import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'

const newUserEmail = 'dagi@dagi.da'
const NewUserPassword = '12345678'
const newMessage = 'this is the new updated message'
let test_id = '0'
let accessToken = '', refreshToken = ''
beforeAll((done)=>{
    done()
})


afterAll(async ()=> {
    await mongoose.connection.close()
})

describe("Auth Tests:",()=> {
    test("get post without token", async() =>{
        const response = await request(app).get('/post')
        expect(response.statusCode).not.toEqual(200)
        })
    test("Register test", async() =>{
        const response = await request(app).post('/auth/register').send({
            "email": newUserEmail,
            "password": NewUserPassword
        })
        expect(response.statusCode).toEqual(200)
    })
    jest.setTimeout(30000)
    test("timeout access", async () =>{
        await new Promise(r => setTimeout(r,10000))
        const response = await request(app).get('/post').set('Authorization', 'JWT' + accessToken)
        expect(response.statusCode).not.toEqual(200)
    })
})
// describe("Auth Tests:",()=> {
//     test("(1.1)Register test", async() =>{
//         const response = await request(app).post('/auth/register').send({
//             "email": newUserEmail,
//             "password": NewUserPassword
//         })
//         expect(response.statusCode).toEqual(200)
//     })
//     test("(1.2)Login test", async() =>{
//         const response = await request(app).post('/auth/login').send({
//             "email": newUserEmail,
//             "password": NewUserPassword
//         })
//         expect(response.statusCode).toEqual(200)
//     })
//     test("(1.3)Logout test", async() =>{
//         const response = await request(app).post('/auth/logout').send({
//             "email": newUserEmail,
//             "password": NewUserPassword
//         })
//         expect(response.statusCode).toEqual(200)
//     })
    
// })
