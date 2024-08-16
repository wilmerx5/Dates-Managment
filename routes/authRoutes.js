import express from 'express'
import { admin, login, register, resetPassword, updatePassword, user, verifyPasswordResetToken, verifyToken } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register',register )

router.post('/login',login )
router.post('/resetpassword',resetPassword )


router.post('/resetpassword/:token',updatePassword )
router.get('/resetpassword/:token',verifyPasswordResetToken )




router.get('/verify/:token',verifyToken)

//private area -- requires JWT
router.get('/user',authMiddleware,user)

router.get('/admin',authMiddleware,admin)




export default router