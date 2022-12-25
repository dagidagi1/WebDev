import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import User from '../models/user_model'

const newUserEmail = 'dagi@dagi.da'
const NewUserPassword = '12345678'
const newMessage = 'this is the new updated message'
let test_id = '0'
let accessToken = '', refreshToken = ''
beforeAll(async ()=>{
    await User.remove()
})


afterAll(async ()=> {
    await User.remove()
    mongoose.connection.close()
})


describe("Auth Tests:",()=> {
    test("Register - new user", async() =>{ //DONE
        const response = await request(app).post('/auth/register').send({
                         "email": newUserEmail,
                         "password": NewUserPassword
                     })
        expect(response.statusCode).toEqual(200)
        })
    test("Register - exist user", async() =>{ //DONE
        const response = await request(app).post('/auth/register').send({
            "email": newUserEmail,
            "password": NewUserPassword
        })
    expect(response.statusCode).toEqual(400)
    })
    test("Login - exist user", async() =>{ //DONE
        const response = await request(app).post('/auth/login').send({
            "email": newUserEmail,
            "password": NewUserPassword
        })
        expect(response.statusCode).toEqual(200)
        accessToken = response.body.accessToken
        expect(accessToken).not.toBeNull()
        refreshToken = response.body.refreshToken
        expect(refreshToken).not.toBeNull()

    })
    test("Login - not exist user", async() =>{ //DONE
        const response = await request(app).post('/auth/register').send({
            "email": 'newUserEmail',
            "password": NewUserPassword
        })
    expect(response.statusCode).toEqual(200)
    })
    test("Login - wrong password", async() =>{ //DONE
        const response = await request(app).post('/auth/register').send({
            "email": newUserEmail,
            "password": 'NewUserPassword'
        })
    expect(response.statusCode).toEqual(400)
    })

    test("Try access with valid token",async ()=>{ //DONE
        const response = await request(app).get('/post').set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(200)
    })
    //jest.setTimeout(15000)
    test("test expiered token",async ()=>{
        await new Promise(r => setTimeout(r,6000))
        const response = await request(app).get('/post').set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).not.toEqual(200)
    })
    test("test refresh token",async ()=>{
        let response = await request(app).get('/auth/refresh').set('Authorization', 'JWT ' + refreshToken);
        expect(response.statusCode).toEqual(200)

        accessToken = response.body.accessToken
        expect(accessToken).not.toBeNull()
        refreshToken = response.body.refreshToken
        expect(refreshToken).not.toBeNull()
        
        response = await request(app).get('/post').set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(200)

    })
    test("Logout - valid token",async ()=>{ //DONE
        const response = await request(app).get('/auth/logout').set('Authorization', 'JWT ' + refreshToken)
        expect(response.statusCode).toEqual(200)
    })
    test("Logout - invalid token",async ()=>{ //DONE
        const response = await request(app).get('/auth/logout').set('Authorization', 'JWT ' + refreshToken)
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
