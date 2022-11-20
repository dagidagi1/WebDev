import Post from '../models/post_model'
import { Express } from 'express'
import { Request, Response } from 'express'
const getAllPosts = async (req:Request ,res:Response) =>{
    let posts = {}
    try{
        if(req.query.sender == null){
            posts = await Post.find()
            res.status(200).send(posts)
        }
        else{
            posts = await Post.find({'sender': req.query.sender})
            res.status(200).send(posts)
        }
    }catch(err){
        res.status(400).send({'err' : "failed to get all posts from DB"})
    }
}
const getPost = async (req:Request ,res:Response) =>{}
const getPostById = async (req:Request ,res:Response) =>{
    console.log(req.params.id)
    const post = await Post.findById(req.params.id)
    res.status(200).send(post)
}

const addPost = async(req:Request ,res:Response) =>{
    const req_message = req.body.message
    const req_sender = req.body.sender
    const post = new Post({
        message: req_message,
        sender: req_sender
    })
    try{
        const newPost = await post.save()
        res.status(200).send(newPost)
}
catch (err){
    console.log("Post-> catch error")
    res.status(400).send({
        'error': 'failed to adding post',
    })
}
}
const putPostById = async (req:Request ,res:Response) =>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body, {new:true})
        res.status(200).send(post)
    }
    catch{
        res.status(400).send({'error': 'fail to update post'})
    }
}
export = {getAllPosts, getPost, addPost, getPostById, putPostById}