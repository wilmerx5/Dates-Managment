import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,

    }

})
const Services = mongoose.model('Services',serviceSchema)

export default Services