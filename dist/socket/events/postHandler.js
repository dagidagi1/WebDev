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
const MyRequest_1 = __importDefault(require("../../common/MyRequest"));
const post_1 = __importDefault(require("../../controllers/post"));
module.exports = (io, socket) => {
    const getAll = (body) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield post_1.default.getAllM(new MyRequest_1.default(body, socket.data.user));
            socket.emit('post:get_all.response', response.body);
        }
        catch (err) {
            socket.emit('post:get_all.response', { 'status': 'fail' });
        }
    });
    const readHandler = (payload) => {
        // ... non usable.
    };
    const getPostById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield post_1.default.getPostById(new MyRequest_1.default(payload, socket.data.user));
            socket.emit('post:get:id.response', response.body);
        }
        catch (err) {
            socket.emit('post:get:id.response', { 'status': 'fail' });
        }
    });
    const getPostBySender = (payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield post_1.default.getAllM(new MyRequest_1.default(payload, socket.data.user));
            socket.emit('post:get:sender.response', response.body);
        }
        catch (err) {
            socket.emit('post:get:sender.response', { 'status': 'fail' });
        }
    });
    const addPost = (body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("postAdd with socketId: %s", socket.id);
        try {
            const response = yield post_1.default.addPostM(new MyRequest_1.default(body, socket.data.user));
            socket.emit('post:add.response', response.body);
        }
        catch (err) {
            socket.emit('post:add.response', { 'status': 'fail' });
        }
    });
    // ...
    const updatePost = () => __awaiter(void 0, void 0, void 0, function* () {
        // ...
    });
    console.log('register post handlers');
    socket.on("post:post", addPost);
    socket.on("post:get_all", getAll);
    socket.on("post:get:id", getPostById);
    socket.on("post:get:sender", getPostBySender);
    socket.on("post:put", updatePost);
    socket.on("post:read", readHandler);
};
//# sourceMappingURL=postHandler.js.map