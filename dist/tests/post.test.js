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
const user_model_1 = __importDefault(require("../models/user_model"));
const newPostMessage = 'This is the new test post message';
let newPostSender = '';
let newPostId = '';
const newPostMessageUpdated = 'This is the updated message';
const userEmail = "user1@gmail.com";
const userPassword = "123456789";
let accessToken = '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    //await Post.remove()
    //await User.remove()
    const res = yield (0, supertest_1.default)(server_1.default).post('/auth/register').send({
        "email": userEmail,
        "password": userPassword,
        "phone": 'newUserPhone',
        "name": 'newUserName',
        "img": 'newUserImg'
    });
    yield loginUser();
    newPostSender = res.body._id;
}));
function loginUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/auth/login').send({
            "email": userEmail,
            "password": userPassword
        });
        accessToken = response.body.accessToken;
    });
}
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    //await loginUser()
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    //await Post.remove()
    yield user_model_1.default.deleteOne({ email: userEmail });
    yield post_model_1.default.deleteOne({ _id: newPostId });
    mongoose_1.default.connection.close();
}));
describe("Posts Tests", () => {
    test("add new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/post').set('Authorization', 'JWT ' + accessToken)
            .send({
            "txt": newPostMessage,
            "usrId": newPostSender,
            "img": "zxc"
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.data.txt).toEqual(newPostMessage);
        expect(response.body.data.usrId).toEqual(newPostSender);
        newPostId = response.body.data._id;
    }));
    test("get all posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post').set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.data[0].txt).toEqual(newPostMessage);
        expect(response.body.data[0].usrId).toEqual(newPostSender);
    }));
    test("get post by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.data.txt).toEqual(newPostMessage);
        expect(response.body.data.usrId).toEqual(newPostSender);
    }));
    test("get post by wrong id fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post/12345').set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(400);
    }));
    test("get post by sender", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post?sender=' + newPostSender).set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.data[0].txt).toEqual(newPostMessage);
        expect(response.body.data[0].usrId).toEqual(newPostSender);
    }));
    test("update post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(server_1.default).put('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
            .send({
            params: {
                "id": newPostId,
                "txt": newPostMessageUpdated,
                "imgUri": newPostSender,
            }
        });
        expect(response.statusCode).toEqual(200);
        response = yield (0, supertest_1.default)(server_1.default).get('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.data.txt).toEqual(newPostMessageUpdated);
        expect(response.body.data.usrId).toEqual(newPostSender);
        response = yield (0, supertest_1.default)(server_1.default).put('/post/12345').set('Authorization', 'JWT ' + accessToken)
            .send({
            "txt": newPostMessageUpdated,
            "usrid": newPostSender
        });
        expect(response.statusCode).toEqual(400);
        response = yield (0, supertest_1.default)(server_1.default).put('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
            .send({ params: {
                "txt": newPostMessageUpdated,
            } });
        expect(response.statusCode).toEqual(200);
    }));
});
//# sourceMappingURL=post.test.js.map