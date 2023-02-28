/**
* @swagger
* tags:
*   name: Auth routes
*   description: The Authentication API
*/

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

import express, { response } from 'express'
import auth from '../controllers/auth'
const router = express.Router()
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
router.post('/login', auth.login)
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
router.post('/register', auth.register)
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
router.post('/logout', auth.logout)
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
router.get('refresh', auth.refresh)
export = router