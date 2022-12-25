import server from "../app"
import mongoose from "mongoose"
import Client, { Socket } from "socket.io-client"
import { DefaultEventsMap } from "@socket.io/component-emitter"

import request from 'supertest'
import Post from '../models/post_model'
import User from '../models/user_model'
import { isAccessor } from "typescript"
const userEmail = 'tester1'
const userPass = '123456789'
let postId = ''
let postSender = ''
const postMessage = 'this is my message'
let token = ''
type Client = {
    'socket': Socket<DefaultEventsMap, DefaultEventsMap>,
    'accessToken': String
}
let Client1: Client
let Client2: Client
let clientSocket: Socket<DefaultEventsMap, DefaultEventsMap>
function clientSocketConnect(clientSocket) {
    return new Promise((resolve: any) => {
        clientSocket.on("connect", resolve)
    })
}
const connect_user = async (userEmail, userPass, token) => {
    const res = await request(server).post('/auth/register').send({
        "email": userEmail,
        "password": userPass
    })
    const response = await request(server).post('/auth/login').send({
        "email": userEmail,
        "password": userPass
    })
    token = response.body.accessToken
    clientSocket = Client('http://localhost:' + process.env.PORT, {
        auth: {
            token: 'barrer ' + token
        }
    })
    await clientSocketConnect(clientSocket)
    const client = { 'socket': clientSocket, 'accessToken': token }
    return client
}
describe("my awesome project", () => {
    beforeAll(async () => {
        await Post.remove()
        await User.remove()
        Client1 = await connect_user(userEmail, userPass, token)
    })
    afterAll(() => {
        server.close()
        clientSocket.close()
        mongoose.connection.close()
    })
    // test("should work", (done) => {
    //     clientSocket.onAny((eventName, arg) => {
    //         console.log("on any")
    //         expect(eventName).toBe('echo:echo')
    //         expect(arg.msg).toBe('hello')
    //         clientSocket.removeAllListeners()
    //         done()
    //     })
    //     clientSocket.emit("echo:echo", { 'msg': 'hello' })
    // })
    test("postAdd", (done) => {
        clientSocket.on('post:add.response', (arg) => {
            expect(arg.message).toEqual(postMessage)
            done()
        })
        clientSocket.emit('post:post', { 'message': postMessage })
    })
    test("get all", (done) => {
        clientSocket.on('post:get_all.response', (args) => {
            postId = args[0]._id
            postSender = args[0].sender
            expect(args).not.toBe(null)
            done()
        })
        clientSocket.emit("post:get_all", 'stam')
    })
    test("get post by id", (done) => {
        clientSocket.on('post:get:id.response', (args) => {
            expect(args).not.toBe(null)
            expect(args.message).toEqual(postMessage)
            done()
        })
        clientSocket.emit("post:get:id", {'id': postId})
    })
    test("get post by sender", (done) => {
        clientSocket.on('post:get:sender.response', (args) => {
            expect(args).not.toBe(null)
            console.log("args: ", args)
            expect(args[0].message).toEqual(postMessage)
            done()
        })
        clientSocket.emit("post:get:sender", {'sender': postSender})
    })
    //jest.setTimeout(15000)
})