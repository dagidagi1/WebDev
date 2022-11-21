import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'

const newUserEmail = 'dagi@dagi.da'
const NewUserPassword = '12345678'
const newMessage = 'this is the new updated message'
let test_id = '0'
beforeAll((done)=>{
    done()
})


afterAll(async ()=> {
    await mongoose.connection.close()
})

describe("Auth Tests:",()=> {
        test("(1.1)Register test", async() =>{
            const response = await request(app).post('/auth/register').send({
                "email": newUserEmail,
                "password": NewUserPassword
            })
            expect(response.statusCode).toEqual(400)
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
