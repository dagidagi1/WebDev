import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    txt: {
        type: String, 
        required: true
    },
    usrId: {
        type: String,
        required: true
    },
    imgUri:{
        type: String,
        required: true
    }
})

export = mongoose.model('Post', postSchema)