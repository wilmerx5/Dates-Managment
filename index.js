import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import express from "express"
import { db } from "./config/bd.js"
import appointmentRoutes from './routes/appointmentRoutes.js'
import authRoutes from './routes/authRoutes.js'
import servicesRoutes from './routes/servicesRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

db()

const whiteList =[process.env.FRONTEND_URL, undefined ]
const corsOptions =({
    origin: function(origin,cb){
        if(whiteList.includes(origin)){
            cb(null,true)
        }else{
            cb(new Error ('cors invalid'))

        }
    }
})

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/services',servicesRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/appointments',appointmentRoutes)
app.use('/api/users',userRoutes)




app.listen(port,()=>{
console.log(colors.green('server started'))
})