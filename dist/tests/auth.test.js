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
const newUserEmail = 'dagi@dagi.da';
const NewUserPassword = '12345678';
const newMessage = 'this is the new updated message';
let test_id = '0';
let accessToken = '', refreshToken = '';
beforeAll((done) => {
    done();
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Auth Tests:", () => {
    test("get post without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post');
        expect(response.statusCode).not.toEqual(200);
    }));
    test("Register test", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/auth/register').send({
            "email": newUserEmail,
            "password": NewUserPassword
        });
        expect(response.statusCode).toEqual(200);
    }));
    jest.setTimeout(30000);
    test("timeout access", () => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise(r => setTimeout(r, 10000));
        const response = yield (0, supertest_1.default)(server_1.default).get('/post').set('Authorization', 'JWT' + accessToken);
        expect(response.statusCode).not.toEqual(200);
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
//# sourceMappingURL=auth.test.js.map