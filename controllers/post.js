const Post = require('../models/post_model')
const { post } = require('../routes/postRoutes')

const getAllPosts = async (req,res, next) =>{
    res.send('get all posts!')
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
const getPost = async (req,res, next) =>{}
const getPostById = async (req,res,next) =>{
    console.log(req.params.id)
    const post = await Post.findById(req.params.id)
    res.status(200).send(post)
}

const addPost = async(req,res, next) =>{
    const req_id = req.body._id
    const req_message = req.body.message
    const req_sender = req.body.sender
    const post = new Post({
        _id: req_id,
        message: req_message,
        sender: req_sender
    })
    try{
        newPost = await post.save()
        res.status(200).send(newPost)
}
catch (err){
    console.log("Post-> catch error")
    res.status(400).send({
        'error': 'failed to adding post',
    })
}
}

module.exports = {getAllPosts, getPost, addPost, getPostById}