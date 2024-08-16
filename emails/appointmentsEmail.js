
import { createTransport } from "../config/nodemailer.js"
export async function sendEmailNewAppointment({date,time}) {
    const transporter = createTransport(process.env.EMAIL_HOST,process.env.EMAIL_PORT,process.env.EMAIL_USER,process.env.EMAIL_PASSWORD )


    const info = await transporter.sendMail({
        from:'"Mail👻" <citas@ppp.email>',
        to:'adminsalon@.com',
        subject:"you have anew date",
        text:"you have anew date",
        html:`<p>Hello store you have a new appointment</p>
       

        <p>date will be ${date} at ${time} hours</p>
        `
    }) 
}

export async function sendEmailUpdateAppointment({date,time}) {

    const transporter = createTransport(process.env.EMAIL_HOST,process.env.EMAIL_PORT,process.env.EMAIL_USER,process.env.EMAIL_PASSWORD )

    const info = await transporter.sendMail({
        from:'"Mail👻" <citas@ppp.email>',
        to:'adminsalon@.com',
        subject:"App salon - Date updated",
        text:"An appointment has ben updated",
        html:`<p>Hello store an user had modified an appointment</p>
       

        <p>date will be ${date} at ${time} hours</p>
        `
    }) 
}

export async function sendEmailCancelledAppointment({date,time}) {
    const transporter = createTransport(process.env.EMAIL_HOST,process.env.EMAIL_PORT,process.env.EMAIL_USER,process.env.EMAIL_PASSWORD )

    const info = await transporter.sendMail({
        from:'"Mail👻" <citas@ppp.email>',
        to:'adminsalon@.com',
        subject:"App salon - Date deleted",
        text:"An appointment has ben cancelled",
        html:`<p>Hello store an user had cancelled an appointment</p>
       

        <p>date was programmed for  ${date} at ${time} hours</p>
        `
    }) 
}