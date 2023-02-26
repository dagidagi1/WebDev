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
const user_model_1 = __importDefault(require("../models/user_model"));
const newUserEmail = 'dagi@dagi.da';
const NewUserPassword = '12345678';
const newMessage = 'this is the new updated message';
let test_id = '0';
let accessToken = '', refreshToken = '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.remove();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.remove();
    mongoose_1.default.connection.close();
}));
describe("Auth Tests:", () => {
    test("Register - new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/auth/register').send({
            "email": newUserEmail,
            "password": NewUserPassword,
            "phone": "123",
            "name": "123",
            "img": "123"
        });
        expect(response.statusCode).toEqual(200);
    }));
    test("Register - exist user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/auth/register').send({
            "email": newUserEmail,
            "password": NewUserPassword,
            "phone": "123",
            "name": "123",
            "img": "123"
        });
        expect(response.statusCode).toEqual(400);
    }));
    test("Login - exist user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/auth/login').send({
            "email": newUserEmail,
            "password": NewUserPassword
        });
        expect(response.statusCode).toEqual(200);
        accessToken = response.body.accessToken;
        expect(accessToken).not.toBeNull();
        refreshToken = response.body.refreshToken;
        expect(refreshToken).not.toBeNull();
    }));
    test("Login - not exist user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/auth/register').send({
            "email": 'newUserEmail',
            "password": NewUserPassword
        });
        expect(response.statusCode).toEqual(200);
    }));
    test("Login - wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/auth/register').send({
            "email": newUserEmail,
            "password": 'NewUserPassword'
        });
        expect(response.statusCode).toEqual(400);
    }));
    test("Try access with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post').set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(200);
    }));
    //jest.setTimeout(15000)
    test("test expiered token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise(r => setTimeout(r, 6000));
        const response = yield (0, supertest_1.default)(server_1.default).get('/post').set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).not.toEqual(200);
    }));
    test("test refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(server_1.default).get('/auth/refresh').set('Authorization', 'JWT ' + refreshToken);
        expect(response.statusCode).toEqual(200);
        accessToken = response.body.accessToken;
        expect(accessToken).not.toBeNull();
        refreshToken = response.body.refreshToken;
        expect(refreshToken).not.toBeNull();
        response = yield (0, supertest_1.default)(server_1.default).get('/post').set('Authorization', 'JWT ' + accessToken);
        expect(response.statusCode).toEqual(200);
    }));
    test("Logout - valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/auth/logout').set('Authorization', 'JWT ' + refreshToken);
        expect(response.statusCode).toEqual(200);
    }));
    test("Logout - invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/auth/logout').set('Authorization', 'JWT ' + refreshToken);
        expect(response.statusCode).toEqual(400);
    }));
});
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
//# sourceMappingURL=authtest.js.map