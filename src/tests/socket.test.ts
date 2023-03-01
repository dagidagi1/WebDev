import server from "../app"
import mongoose from "mongoose"
import Client, { Socket } from "socket.io-client"
import { DefaultEventsMap } from "@socket.io/component-emitter"

import request from 'supertest'
import Post from '../models/post_model'
import User from '../models/user_model'
const userEmail = ['tester1', 'tester2']
const userPass = ['123456789', '123123123']
let postId = ''
let postSender = ''
const postMessage = 'this is my message'
let token = ''
type Client = {
    id: string,
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
        "password": userPass,
        "phone": userPass,
        "name": userPass,
        "img": userPass
    })
    const usrId = res.body._id
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
    const client = { 'socket': clientSocket, 'accessToken': token, 'id': usrId }
    return client
}
describe("my awesome project", () => {
    beforeAll(async () => {
        Client1 = await connect_user(userEmail[0], userPass[0], token)
        Client2 = await connect_user(userEmail[1], userPass[1], token)
    })
    afterAll(() => {
        server.close()
        Client1.socket.close()
        Client2.socket.close()
        mongoose.connection.close()
    })
    // test("postAdd", (done) => {
    //     clientSocket.on('post:add.response', (arg) => {
    //         expect(arg.message).toEqual(postMessage)
    //         done()
    //     })
    //     clientSocket.emit('post:post', { 'message': postMessage })
    // })
    // test("get all", (done) => {
    //     clientSocket.on('post:get_all.response', (args) => {
    //         postId = args[0]._id
    //         postSender = args[0].sender
    //         expect(args).not.toBe(null)
    //         done()
    //     })
    //     clientSocket.emit("post:get_all", 'stam')
    // })
    // test("get post by id", (done) => {
    //     clientSocket.on('post:get:id.response', (args) => {
    //         expect(args).not.toBe(null)
    //         expect(args.message).toEqual(postMessage)
    //         done()
    //     })
    //     clientSocket.emit("post:get:id", {'id': postId})
    // })
    // test("get post by sender", (done) => {
    //     clientSocket.on('post:get:sender.response', (args) => {
    //         expect(args).not.toBe(null)
    //         expect(args[0].message).toEqual(postMessage)
    //         done()
    //     })
    //     clientSocket.emit("post:get:sender", {'sender': postSender})
    // })
    test("Test chat messages from 1 client", (done) => {
        const msg = "Hi.... Test123"
        Client2.socket.once("chat:message", (args) => {
            expect(args.to).toBe('global')
            expect(args.message).toBe(msg)
            done()
        })
        Client1.socket.emit("chat:send_message", { "to": 'global', "message": msg })
    })

    test("Test chat messages from 2 client", (done) => {
        const msg = "Hi.... Test123"
        Client1.socket.once("chat:message", (args) => {
            expect(args.to).toBe('global')
            expect(args.message).toBe(msg)
            done()
        })
        Client2.socket.emit("chat:send_message", { "to": 'global', "message": msg })
    })

    test("Test get messages", (done) => {
        Client1.socket.once("chat:get_messages.response", (args) => {
            expect(args.length).not.toBe(0)
            done()
        })
        Client1.socket.emit("chat:get_messages", { "id": Client2.id })
    })
})