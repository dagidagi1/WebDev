import express, { response } from 'express'
import auth from '../controllers/auth'
const router = express.Router()

router.post('/login', auth.login)
router.post('/register', auth.register)
router.post('/logout',auth.authenticateMiddleware, auth.logout)
router.get('refresh', auth.refresh)
export = router