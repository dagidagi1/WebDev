const getAllPosts = async(req,res, next) =>{
    res.send('get all posts!')
}
const getPost = (req,res, next) =>{

}
const addPost = (req,res, next) =>{
    res.send('New post added!')
}

module.exports = {getAllPosts, getPost, addPost}