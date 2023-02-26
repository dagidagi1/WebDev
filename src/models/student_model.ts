import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    img:{
        type:[String]
    },
    phone: {
        type: String,
        required: true
    }
})

export = mongoose.model('User', studentSchema)