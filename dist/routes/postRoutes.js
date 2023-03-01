"use strict";
/**
* @swagger
* tags:
*   name: Post
*   description: The Post API
*/
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
const express_1 = __importDefault(require("express"));
const MyRequest_1 = __importDefault(require("../common/MyRequest"));
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.default.Router();
const post_1 = __importDefault(require("../controllers/post"));
/**
* @swagger
* components:
*   schemas:
*       Post:
*           type: object
*           required:
*               - message
*               - sender
*           properties:
*               message:
*                   type: string
*                   description: Post message
*               sender:
*                   type: string
*                   description: Post publisher name
*           example:
*               message: '123cd123x1xx1'
*               sender: '134r2134cr1x3c'
*/
/**
* @swagger
* /post/:
*   get:
*       summary: Get list of posts from server
*       tags: [Post]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: List of posts
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Post'
*                       example:
*                           message: 'abc'
*                           sender: 'def'
*/
router.get('/', auth_1.default.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ROUTER: GET: /POST/");
    try {
        const response = yield post_1.default.getAllM(MyRequest_1.default.fromRestRequest(req));
        response.sendRestResponse(res);
    }
    catch (err) {
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        });
    }
}));
/**
* @swagger
* /post/:
*   get:
*       summary: Get list of posts from server
*       tags: [Post]
*       security:
*           - bearerAuth: []
*       responses:
*           200:
*               description: List of posts
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Post'
*                       example:
*                           message: 'abc'
*                           sender: 'def'
*/
router.get('/:id', auth_1.default.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield post_1.default.getPostById(MyRequest_1.default.fromRestRequest(req));
        //console.log("Res: ",res)
        response.sendRestResponse(res);
    }
    catch (err) {
        //console.log("ERR: ",err)
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        });
    }
}));
router.put('/:id', auth_1.default.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("PUT: post/id");
        const response = yield post_1.default.updatePostById(MyRequest_1.default.fromRestRequest(req));
        response.sendRestResponse(res);
    }
    catch (err) {
        res.status(401).send({
            'status': 'fail',
            'message': err.message
        });
    }
}));
router.post('/', auth_1.default.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield post_1.default.addPostM(MyRequest_1.default.fromRestRequest(req));
        response.sendRestResponse(res);
    }
    catch (err) {
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        });
    }
}));
router.post('/delete/:id', auth_1.default.authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield post_1.default.deletePost(MyRequest_1.default.fromRestRequest(req));
        response.sendRestResponse(res);
    }
    catch (err) {
        res.status(400).send({
            'status': 'Fail',
            'message': err.message
        });
    }
}));
module.exports = router;
//# sourceMappingURL=postRoutes.js.map