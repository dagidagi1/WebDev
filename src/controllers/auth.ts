import User from '../models/user_model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//import { Express } from 'express'
import { NextFunction, Request, Response } from 'express'
import user_model from '../models/user_model'
//import { response } from '../server'
function sendError(res:Response,error:String){
    res.status(400).send({
        'status': 'fail',
        'message': error
    })
}

const authenticateMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization']
    if(authHeader == null || authHeader == undefined) return sendError(res, 'authentication header is missing!')
    const token = authHeader.split(' ')[1]
    if(token == null) return sendError(res, 'Authenticator missing')
    try{
        const usr = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.body.usrId = usr._id
        next()
    }catch(err){ return sendError(res, 'failed to validate token!')}

}
const register = async (req:Request ,res:Response) =>{
    console.log("register!")
    const email = req.body.email
    const pass = req.body.password
    
    if(email == null || pass == null){
        console.log("No pass or email")
        return sendError(res,'Please provide email and password!')
    }
    try{
        let user = await User.findOne({'email': email})
        if(user != null){
            return sendError(res, 'User is already exist!')
        }
    }catch(err){
        return sendError(res, err)
    }
    try{
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(pass, salt)
        let newUser = new User({
            'email': email,
            'password': encryptedPassword,
            'phone': req.body.phone,
            'name': req.body.name,
            'img': req.body.img
        })
        newUser = await newUser.save()
        res.status(200).send(newUser)
    }catch(err){
        return sendError(res, err)
    }
}
const login = async (req:Request ,res:Response) =>{
    console.log('Login!')
    const email = req.body.email
    const pass = req.body.password
    if(email == null || pass == null){
        return sendError(res,'Please provide email and password!')
    }
    try{
        let user = await User.findOne({'email': email})
        if(user == null)    return sendError(res, 'bad email or pass!')
        const match = await bcrypt.compare(pass, user.password)
        if (!match) return sendError(res, 'bad email or pass')
        const accessToken = await jwt.sign(
            {'_id':user._id},
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn: process.env.JWT_TOKEN_EXPIRATION}
        )
        const refreshToken = await jwt.sign(
            {'_id':user._id},
            process.env.REFRESH_TOKEN_SECRET
        )
        if(user.refresh_tokens == null) user.refresh_tokens = [refreshToken]
        else user.refresh_tokens.push(refreshToken)
        await user.save()
        res.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken,
            'id': user._id // TODO : add to tests.
        })
    }catch(err){
        return sendError(res, err.message)
    }
}
const logout = async (req:Request ,res:Response) =>{
    console.log("Log out")
    const authHeader = req.headers['authorization']
    if(authHeader == null || authHeader == undefined) return sendError(res, 'authentication header is missing!')
    const ref_token = authHeader.split(' ')[1]
    if(ref_token == null) return sendError(res, 'Authenticator missing')
    try{
        const usr = await jwt.verify(ref_token, process.env.REFRESH_TOKEN_SECRET)
        const usrObj = await User.findById(usr._id)
        if(usrObj == null) return sendError(res, 'invalid validating token')

        if(!usrObj.refresh_tokens.includes(ref_token)){
            usrObj.refresh_tokens = []
            await usrObj.save()
            return sendError(res, 'invalid validating token')
        }
        usrObj.refresh_tokens.splice(usrObj.refresh_tokens.indexOf(ref_token), 1)
        await usrObj.save()
        res.status(200).send()
    }catch(err){return sendError(res, err.message)}
}
const refresh =async (req:Request, res:Response) => {
    const authHeader = req.headers['authorization']
    if(authHeader == null || authHeader == undefined) return sendError(res, 'authentication header is missing!')
    const ref_token = authHeader.split(' ')[1]
    if(ref_token == null) return sendError(res, 'Authenticator missing')
    try{
        const usr = await jwt.verify(ref_token, process.env.REFRESH_TOKEN_SECRET)
        const usrObj = await User.findById(usr._id)
        if(usrObj == null) return sendError(res, 'invalid validating token')

        if(!usrObj.refresh_tokens.includes(ref_token)){
            usrObj.refresh_tokens = []
            await usrObj.save()
            return sendError(res, 'invalid validating token')
        }
        const newAccessToken = await jwt.sign(
            {'_id':usr._id},
            process.env.ACCESS_TOKEN_SECRET, 
            {expiresIn: process.env.JWT_TOKEN_EXPIRATION}
        )
        const newRefreshToken = await jwt.sign(
            {'_id':usr._id},
            process.env.REFRESH_TOKEN_SECRET
        )
        usrObj.refresh_tokens[usrObj.refresh_tokens.indexOf(ref_token)]
        await usrObj.save()
        res.status(200).send({
            'accessToken': newAccessToken,
            'refreshToken': newRefreshToken
        })
    }catch(err){sendError(res,err.message)}
}
export = {login, register, logout, refresh,  authenticateMiddleware}