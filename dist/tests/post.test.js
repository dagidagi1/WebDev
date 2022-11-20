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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post_model"));
const newPostMessage = ['test message1', 'test message2', 'test message3', 'test message4'];
const newPostSender = ['tester1', 'tester2', 'tester3', 'tester4'];
const newMessage = 'this is the new updated message';
let test_id = '0';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.remove();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.remove();
    mongoose_1.default.connection.close();
}));
describe("Post Tests:", () => {
    test("(1.1)add new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/post').send({
            "message": newPostMessage[0],
            "sender": newPostSender[0]
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(newPostMessage[0]);
        expect(response.body.sender).toEqual(newPostSender[0]);
    }));
    test("(1.2)add new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/post').send({
            "message": newPostMessage[1],
            "sender": newPostSender[1]
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(newPostMessage[1]);
        expect(response.body.sender).toEqual(newPostSender[1]);
    }));
    test("(1.3)add new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/post').send({
            "message": newPostMessage[2],
            "sender": newPostSender[2]
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(newPostMessage[2]);
        expect(response.body.sender).toEqual(newPostSender[2]);
    }));
    test("(1.4)add new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/post').send({
            "message": newPostMessage[3],
            "sender": newPostSender[3]
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(newPostMessage[3]);
        expect(response.body.sender).toEqual(newPostSender[3]);
        test_id = response.body._id;
    }));
    test("(2)Get all posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post');
        expect(response.statusCode).toEqual(200);
    }));
    test("(3)Get post by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post/' + test_id);
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(newPostMessage[3]);
        expect(response.body.sender).toEqual(newPostSender[3]);
    }));
    test("(4)update post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post/' + test_id);
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(newPostMessage[3]);
        expect(response.body.sender).toEqual(newPostSender[3]);
    }));
});
//# sourceMappingURL=post.test.js.map