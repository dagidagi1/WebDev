"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const supertest_1 = __importDefault(require("supertest"));
const post_model_1 = __importDefault(require("../models/post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const userEmail = 'tester1';
const userPass = '123456789';
let postId = '';
let postSender = '';
const postMessage = 'this is my message';
let token = '';
let Client1;
let Client2;
let clientSocket;
function clientSocketConnect(clientSocket) {
    return new Promise((resolve) => {
        clientSocket.on("connect", resolve);
    });
}
const connect_user = (userEmail, userPass, token) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default).post('/auth/register').send({
        "email": userEmail,
        "password": userPass
    });
    const response = yield (0, supertest_1.default)(app_1.default).post('/auth/login').send({
        "email": userEmail,
        "password": userPass
    });
    token = response.body.accessToken;
    clientSocket = (0, socket_io_client_1.default)('http://localhost:' + process.env.PORT, {
        auth: {
            token: 'barrer ' + token
        }
    });
    yield clientSocketConnect(clientSocket);
    const client = { 'socket': clientSocket, 'accessToken': token };
    return client;
});
describe("my awesome project", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield post_model_1.default.remove();
        yield user_model_1.default.remove();
        Client1 = yield connect_user(userEmail, userPass, token);
    }));
    afterAll(() => {
        app_1.default.close();
        clientSocket.close();
        mongoose_1.default.connection.close();
    });
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
            expect(arg.message).toEqual(postMessage);
            done();
        });
        clientSocket.emit('post:post', { 'message': postMessage });
    });
    test("get all", (done) => {
        clientSocket.on('post:get_all.response', (args) => {
            postId = args[0]._id;
            postSender = args[0].sender;
            expect(args).not.toBe(null);
            done();
        });
        clientSocket.emit("post:get_all", 'stam');
    });
    test("get post by id", (done) => {
        clientSocket.on('post:get:id.response', (args) => {
            expect(args).not.toBe(null);
            expect(args.message).toEqual(postMessage);
            done();
        });
        clientSocket.emit("post:get:id", { 'id': postId });
    });
    test("get post by sender", (done) => {
        clientSocket.on('post:get:sender.response', (args) => {
            expect(args).not.toBe(null);
            console.log("args: ", args);
            expect(args[0].message).toEqual(postMessage);
            done();
        });
        clientSocket.emit("post:get:sender", { 'sender': postSender });
    });
    //jest.setTimeout(15000)
});
//# sourceMappingURL=socket.test.js.map