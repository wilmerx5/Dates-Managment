import colors from 'colors'
import dotenv from 'dotenv'
import { db } from '../config/bd.js'
import Service from '../models/ServiceModel.js'

import { services } from './services.js'
dotenv.config()
await db()

async function seedDB() {
    try {

        await Service.insertMany(services)
        console.log(colors.green('INSERTION WENT OK'))
        process.exit()
    }
    catch (e) {
        console.log(e)
        process.exit(1)

    }
}

async function clearDb() {
    try {

        await Service.deleteMany()
        console.log(colors.bgRed('delete WENT OK'))
        process.exit()
    }
    catch (e) {
        console.log(e)
        process.exit(1)

    }
}

if (process.argv[2] == '--import') {
    seedDB()
}
else {
    clearDb()
}