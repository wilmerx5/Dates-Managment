import { createTransport } from "../config/nodemailer.js";
export async function sendEmailVerification({name,email,token}) {
    
    
    const transporter = createTransport(process.env.EMAIL_HOST,process.env.EMAIL_PORT,process.env.EMAIL_USER,process.env.EMAIL_PASSWORD )


    const info = await transporter.sendMail({
        from:'"Mail👻" <admin@ppp.email>',
        to:email,
        subject:"Confirm Account",
        text:"Confirm your account",
        html:`<p>Hello ${name}, pleas confirm your account</p>
        <p>Your account is almost ready, please click here 
        <a href="${process.env.FRONTEND_URL}/auth/verify-account/${token}">Confirm account</a> </p>

        <p>If you don't create your account please ignore this message</p>
        `
    }) 
    console.log('enviado correctamente ')
}


export async function sendEmailResetPassword({name,email,token}) {
    
    
    const transporter = createTransport(process.env.EMAIL_HOST,process.env.EMAIL_PORT,process.env.EMAIL_USER,process.env.EMAIL_PASSWORD )


    const info = await transporter.sendMail({
        from:'"Mail👻" <admin@ppp.email>',
        to:email,
        subject:"Reset your account ",
        text:"Reset your account",
        html:`<p>Hello ${name}, Reset your password</p>
        <p>Click the next link to reset password
        <a href="${process.env.FRONTEND_URL}/auth/resetpassword/${token}">Reset account</a> </p>

        <p>If you don't create your account please ignore this message</p>
        `
    }) 
    console.log('enviado correctamente ')
}