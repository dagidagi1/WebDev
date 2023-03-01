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
        return new MyResponse(post, req.userId, null)
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
        return new MyResponse(posts, req.userId, null)

    } catch (err) {
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }
}
const addPostM = async (req) => {
    // const msg = req.body.message
    // const sender = req.userId
    // const post = new Post({
    //     message: msg,
    //     sender: sender
    // })
    // try {
    //     const newPost = await post.save()
    //     return new MyResponse(newPost, req.userId, null)
    // } catch (err) {
    //     return new MyResponse(null, req.userId, new MyError(400, err.message))
    // }
    const post = new Post({
        txt: req.body.txt,
        usrId: req.body.usrId,
        imgUri: req.body.img
    })
    try {
        const newPost = await post.save()
        return new MyResponse(newPost, newPost.usrId, null)
    } catch (err) {
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }
}
const addPost = async (req: Request, res: Response) => {
    const post = new Post({
        txt: req.body.txt,
        usrId: req.body.usrId,
        imgUri: req.body.img
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
    console.log("REQ: " + JSON.stringify(req))
    try {
        const post = await Post.findByIdAndUpdate(req.body.params.id, req.body.params, { new: true })
        console.log("POST DB UPDATE: ", post)
        return new MyResponse(post, req.userId, null)
    }
    catch (err) {
        console.log("Catch: ", err)
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }
}
const deletePost = async (req) => {
    try {
        const postId = req.body.params.id
        const result = await Post.deleteOne({ "_id": postId })
        if (result.deletedCount == 1)
            return new MyResponse(null, req.userId, null)
        return new MyResponse(null, req.userId, new MyError(400, "Post doesn't exist"))
    }
    catch (err) {
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }

}
export = { deletePost, getAllPosts, getPost, addPost, getPostById, putPostById, getAllM, addPostM, updatePostById }