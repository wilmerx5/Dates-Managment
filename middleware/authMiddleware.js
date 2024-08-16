import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const authMiddleware = async (req, res, next) => {

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{

            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET) 
            req.user = await User.findById(decoded.id).select("-password -verified -token -__v")
            next()
        }
        catch(e){
            const err = new Error('invalid token')
            res.status(403).json({msg:err.message})
        }
    }else{
        const err = new Error('invalid token')
         res.status(403).json({msg:err.message})
    }
}

export default authMiddleware