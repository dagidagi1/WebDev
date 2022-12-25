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
const post_model_1 = __importDefault(require("../models/post_model"));
const MyResponse_1 = __importDefault(require("../common/MyResponse"));
const MyError_1 = __importDefault(require("../common/MyError"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = {};
    try {
        if (req.query.sender == null) {
            posts = yield post_model_1.default.find();
            res.status(200).send(posts);
        }
        else {
            posts = yield post_model_1.default.find({ 'sender': req.query.sender });
            res.status(200).send(posts);
        }
    }
    catch (err) {
        res.status(400).send({ 'err': "failed to get all posts from DB" });
    }
});
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
// const getPostById = async (req: Request, res: Response) => {
//     //console.log(req.params.id)
//     const post = await Post.findById(req.params.id)
//     res.status(200).send(post)
// }
const getPostById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.body.id);
        console.log("post: ", post);
        return new MyResponse_1.default(post, req.userId, null);
    }
    catch (err) {
        return new MyResponse_1.default(null, req.userId, new MyError_1.default(400, err.message));
    }
});
const getAllM = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let posts = {};
    try {
        if (req.body.bySender == null) {
            posts = yield post_model_1.default.find();
        }
        else {
            posts = yield post_model_1.default.find({ 'sender': req.body.bySender });
        }
        return new MyResponse_1.default(posts, req.userId, null);
    }
    catch (err) {
        return new MyResponse_1.default(null, req.userId, new MyError_1.default(400, err.message));
    }
});
const addPostM = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = req.body.message;
    const sender = req.userId;
    const post = new post_model_1.default({
        message: msg,
        sender: sender
    });
    try {
        const newPost = yield post.save();
        return new MyResponse_1.default(newPost, req.userId, null);
    }
    catch (err) {
        return new MyResponse_1.default(null, req.userId, new MyError_1.default(400, err.message));
    }
});
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const req_message = req.body.message;
    const req_sender = req.body.sender;
    const post = new post_model_1.default({
        message: req_message,
        sender: req_sender
    });
    try {
        const newPost = yield post.save();
        res.status(200).send(newPost);
    }
    catch (err) {
        console.log("Post-> catch error");
        res.status(400).send({
            'error': 'failed to adding post',
        });
    }
});
const putPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(post);
    }
    catch (_a) {
        res.status(400).send({ 'error': 'fail to update post' });
    }
});
const updatePostById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findByIdAndUpdate(req.body.id, req.body, { new: true });
        return new MyResponse_1.default(post, req.userId, null);
    }
    catch (err) {
        return new MyResponse_1.default(null, req.userId, new MyError_1.default(400, err.message));
    }
});
module.exports = { getAllPosts, getPost, addPost, getPostById, putPostById, getAllM, addPostM, updatePostById };
//# sourceMappingURL=post.js.map