import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refresh_tokens:{
        type:[String]
    },
    phone:{
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    img: {
        type:String,
        required: true
    }
})

export = mongoose.model('User', userSchema)