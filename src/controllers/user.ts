import User from '../models/user_model'
import MyResponse from '../common/MyResponse'
import MyError from '../common/MyError'
import bcrypt from 'bcrypt'

const getUserById = async (req) => {
    try {
        //console.log("ID: ", req.query.id)
        const usr = await User.findById(req.query.id)
        //console.log("user: ", usr)
        const newUsr = {
            name: usr.name,
            email: usr.email,
            img: usr.img,
            id: usr.id,
            phone: usr.phone
        }
        return new MyResponse(newUsr, req.id, null)
    } catch (err) {
        return new MyResponse(null, req.id, new MyError(400, err.message))
    }
}
const updateUserById = async (req) => {
    console.log("REQQ: " + JSON.stringify(req))
    try {
        console.log("ID: ", req.body.id)
        if (req.body.params.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.params.password = await bcrypt.hash(req.body.params.password, salt)
        }
        const user = await User.findByIdAndUpdate(req.body.usrId, req.body.params, { new: true })
        console.log("USER DB UPDATE: ", user)
        return new MyResponse(user, req.userId, null)
    }
    catch (err) {
        console.log("Catch: ", err)
        return new MyResponse(null, req.userId, new MyError(400, err.message))
    }
}
export { getUserById, updateUserById }