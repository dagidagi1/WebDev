import express from 'express'
import MyRequest from '../common/MyRequest'
import auth from '../controllers/auth'
import { Request } from 'express'
const router = express.Router()
import {getUserById} from '../controllers/user'
import post from '../controllers/post'

router.get('/', async (req:Request, res) => {
    //console.log("router/usr/:id "+ req)
    // try {
    //     const response = await getUserById(MyRequest.fromRestRequest(req))
    //     //console.log("Res: ",res)
    //     response.sendRestResponse(res)
    // } catch (err) {
    //     //console.log("ERR: ",err)
    //     console.log(err.message)
    //     res.status(400).send({
    //         'status': 'fail',
    //         'message': err.message
    //     })
    // }
    try {
        const response = await getUserById(req)
        //console.log("Res: ",res)
        response.sendRestResponse(res)
    } catch (err) {
        //console.log("ERR: ",err)
        //console.log(err.message)
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        })
    }
})
export = router