import User from '../models/user_model'
import MyResponse from '../common/MyResponse'
import MyError from '../common/MyError'

const getUserById = async (req) => {
    try {
        //console.log("ID: ", req.query.id)
        const usr = await User.findById(req.query.id)
        //console.log("user: ", usr)
        const newUsr = {
            name: usr.name,
            email: usr.email,
            img: usr.img,
            id: usr.id
        }
        return new MyResponse(newUsr, req.id, null)
    } catch (err) {
        return new MyResponse(null, req.id, new MyError(400, err.message))
    }
}
export { getUserById }