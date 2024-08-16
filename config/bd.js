import colors from 'colors'
import mongoose from "mongoose"

export const db = async () => {

    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
console.log(colors.blue.bgCyan("Mongo DB se conecto correctamente "))
    }
    catch (e) {
        console.log(colors.red(e))
    }
}