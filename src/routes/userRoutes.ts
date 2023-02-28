import express from 'express'
import MyRequest from '../common/MyRequest'
import auth from '../controllers/auth'
import { Request } from 'express'
const router = express.Router()
import {getUserById, updateUserById} from '../controllers/user'
import post from '../controllers/post'
import user_model from '../models/user_model'

router.get('/', async (req:Request, res) => {
    try {
        const response = await getUserById(req)
        response.sendRestResponse(res)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        })
    }
})
router.put('/:id', auth.authenticateMiddleware, async(req,res) => {
    try {
        console.log("PUT: user/id")
        const response = await updateUserById(MyRequest.fromRestRequest(req))
        response.sendRestResponse(res)
    } catch (err) {
        res.status(401).send({
            'status': 'fail',
            'message': err.message
        })
    }
})
export = router