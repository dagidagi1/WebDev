import Post from '../models/post_model'
import { Express } from 'express'
import { Request, Response } from 'express'
import MyResponse from '../common/MyResponse'
import MyError from '../common/MyError'
import MyRequest from '../common/MyRequest'
const getAllPosts = async (req: Request, res: Response) => {
    let posts = {}
    try {
        if (req.query.sender == null) {
            posts = await Post.find()
            res.status(200).send(posts)
        }
        else {
            posts = await Post.find({ 'sender': req.query.sender })
            res.status(200).send(posts)
        }
    } catch (err) {
        res.status(400).send({ 'err': "failed to get all posts from DB" })
    }
}
const getPost = async (req: Request, res: Response) => { }
// const getPostById = async (req: Request, res: Response) => {
//     //console.log(req.params.id)
//     const post = await Post.findById(req.params.id)
//     res.status(200).send(post)
// }
const getPostById = async (req) => {
    try {
        const post = await Post.findById(req.body.id)
        console.log("post: ", post)
        return new MyResponse(post,req.userId,null)
    } catch (err) {
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }
}
const getAllM = async (req) => {
    let posts = {}
    try {
        if (req.body.bySender == null) {
            posts = await Post.find()
        }
        else {
            posts = await Post.find({ 'sender': req.body.bySender })
        }
        return new MyResponse(posts,req.userId,null)

    } catch (err) {
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }
}
const addPostM = async (req) => {
    const msg = req.body.message
    const sender = req.userId
    const post = new Post({
        message: msg,
        sender: sender
    })
    try {
        const newPost = await post.save()
        return new MyResponse(newPost, req.userId, null)
    } catch (err) {
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }
}
const addPost = async (req: Request, res: Response) => {
    const req_message = req.body.message
    const req_sender = req.body.sender
    const post = new Post({
        message: req_message,
        sender: req_sender
    })
    try {
        const newPost = await post.save()
        res.status(200).send(newPost)
    }
    catch (err) {
        console.log("Post-> catch error")
        res.status(400).send({
            'error': 'failed to adding post',
        })
    }
}
const putPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).send(post)
    }
    catch {
        res.status(400).send({ 'error': 'fail to update post' })
    }
}
const updatePostById = async (req) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body.id, req.body, { new: true })
        return new MyResponse(post, req.userId, null)
    }
    catch(err) {
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }
}
export = { getAllPosts, getPost, addPost, getPostById, putPostById, getAllM, addPostM, updatePostById }