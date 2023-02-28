"use strict";
/**
* @swagger
* tags:
*   name: Auth routes
*   description: The Authentication API
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
* @swagger
* components:
*   securitySchemes:
*       bearerAuth:
*           type: http
*           scheme: bearer
*           bearerFormat: JWT
*/
/**
* @swagger
* components:
*   schemas:
*       User:
*           type: object
*           required:
*               - email
*               - password
*           properties:
*               email:
*                   type: string
*                   description: The user email
*               password:
*                   type: string
*                   description: The user password
*           example:
*               email: 'bob@gmail.com'
*               password: '123456'
*/
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.default.Router();
/**
* @swagger
* /auth/login:
*   post:
*       summary: login as an exist user
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: User logged in
*               content:
*                   application/json:
*                       schema:
*                           accessToken:
*                               type: string
*                               description: user access token
*                           refreshToken:
*                               type: string
*                               description: user access token
*                       example:
*                           accessToken: 'abc'
*                           refreshToken: 'def'
*           400:
*               description: User not logged in
*               content:
*                   application/json:
*                       schema:
*                           accessToken:
*                               type: string
*                               description: user access token
*                           refreshToken:
*                               type: string
*                               description: user access token
*/
router.post('/login', auth_1.default.login);
/**
* @swagger
* /auth/register:
*   post:
*       summary: registers a new user
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: The new user
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*           400:
*               description: The new user
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*/
router.post('/register', auth_1.default.register);
/**
* @swagger
* /auth/register:
*   post:
*       summary: registers a new user
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: The new user
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*/
router.post('/logout', auth_1.default.logout);
/**
* @swagger
* /auth/register:
*   post:
*       summary: registers a new user
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: The new user
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*/
router.get('refresh', auth_1.default.refresh);
module.exports = router;
//# sourceMappingURL=authRoutes.js.map