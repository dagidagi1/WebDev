import MyRequest from '../../common/MyRequest'
import post from '../../controllers/post'
import postController from '../../controllers/post'

export = (io: any, socket: any) => {
    const getAll = async (body) => {
        try {
            const response = await post.getAllM(new MyRequest(body, socket.data.user))
            socket.emit('post:get_all.response', response.body)
        } catch (err) {
            socket.emit('post:get_all.response', { 'status': 'fail' })
        }
    }
    const readHandler = (payload) => {
        // ... non usable.
    }
    const getPostById = async (payload) => {
        try {
            const response = await post.getPostById(new MyRequest(payload, socket.data.user))
            socket.emit('post:get:id.response', response.body)
        } catch (err) {
            socket.emit('post:get:id.response', { 'status': 'fail' })
        }
    }
    const getPostBySender = async (payload) => {
        try {
            const response = await post.getAllM(new MyRequest(payload, socket.data.user))
            socket.emit('post:get:sender.response', response.body)
        } catch (err) {
            socket.emit('post:get:sender.response', { 'status': 'fail' })
        }
    }
    const addPost = async (body) => {
        console.log("postAdd with socketId: %s", socket.id)
        try {
            const response = await post.addPostM(new MyRequest(body, socket.data.user))
            socket.emit('post:add.response', response.body)
        } catch (err) {
            socket.emit('post:add.response', { 'status': 'fail' })
        }
    }

    // ...
    const updatePost = async () => {
        // ...
    }
    console.log('register post handlers')
    socket.on("post:post", addPost)
    socket.on("post:get_all", getAll);
    socket.on("post:get:id", getPostById);
    socket.on("post:get:sender", getPostBySender);
    socket.on("post:put", updatePost);
    socket.on("post:read", readHandler);
}