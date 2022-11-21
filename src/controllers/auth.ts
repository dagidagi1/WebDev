import User from '../models/user_model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//import { Express } from 'express'
import { Request, Response } from 'express'
//import { response } from '../server'
function sendError(res:Response,error:String){
    res.status(400).send({
        'status': 'fail',
        'message': error
    })
}
const register = async (req:Request ,res:Response) =>{
    console.log("register!")
    const email = req.body.email
    const pass = req.body.password
    //console.log(req.body.email, pass)
    if(email == null || pass == null){
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
            'password': encryptedPassword
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
        res.status(200).send({'accessToken': accessToken})
    }catch(err){
        return sendError(res, err)
    }
}
const logout = async (req:Request ,res:Response) =>{
    res.status(400).send({
        'status': 'fail',
        'message':'not implemented'
    })
}
export = {login, register,logout}