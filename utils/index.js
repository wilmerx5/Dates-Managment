
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
function validateObjectId(id,res){
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            msg:'bad id'
           })
    }
}

function handleNotFound(res){
    return res.status(404).json({
        msg:'not found'
       })
}

const generateJWT=(id)=>{
   const token = jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn:'30d'
   })

   return token
}

const uniqueId=()=> Date.now().toString(32) +Math.random().toString(32).substring(2)
export { generateJWT, handleNotFound, uniqueId, validateObjectId }

