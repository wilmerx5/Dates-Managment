import { sendEmailResetPassword, sendEmailVerification } from '../emails/authEmail.js'
import User from '../models/User.js'
import { generateJWT, uniqueId } from '../utils/index.js'
const register = async (req, res) => {

    const { body } = req

    if (Object.values(body).includes('')) {

        const err = new Error('Invalid FIelds')
        return res.status(400).json({ error: { msg: err.message } })

    }

    const { email, password, name } = body

    const userExist = await User.findOne({ email })

    if (userExist) {
        const err = new Error('User already exist')

        return res.status(404).json({ msg: err.message })

    }

    if (password.trim().length < 8) {
        const err = new Error('Invalid Password')

        return res.status(400).json({ error: { msg: err.message } })

    }

    try {
        const user = new User(body)
        const savedUser = await user.save()
        sendEmailVerification({
            name: savedUser.name,
            email: 'correo@correo.com',
            token: savedUser.token

        })
        return res.status(200).json({ msg: 'User successfully saved ' })

    }
    catch (e) {
        res.status(403).json({ error: { msg: e.message } })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        const err = new Error('Invalid User/password')

        return res.status(403).json({ error: err.message })
    }

    if (!user.verified) {
        const err = new Error('Account no confirmed yet')
        return res.status(403).json({ error: err.message })
    }

    if (await user.checkPassword(password)) {

        const token = generateJWT(user._id)


        return res.status(200).json({ msg: 'success', token })

    }
    else {
        const err = new Error('Invalid User/password')

        res.status(403).json({ error: err.message })
    }

}

const verifyToken = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({ token })
    if (!user) {
        const err = new Error('invalid token/already validated')

        return res.status(400).json({ msg: err.message })

    }
    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.status(200).json({ msg: 'Validate account successfully' })

    }
    catch (e) {
        res.status(401).json({ msg: 'Error validating your account' })

    }
}
const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ msg: 'User not found' })

    }
    try {
        user.token = uniqueId()
        await user.save()
        sendEmailResetPassword({
            name: user.name,
            email: user.email,
            token: user.token
        })
        res.json({ msg: 'We have send an email with instructions' })
    } catch (e) {
        return res.status(401).json({ msg: 'Error validating account' })

    }
}

const verifyPasswordResetToken = async (req, res) => {

    const { token } = req.params

    const isValidToken = await User.findOne({ token })

    if (!isValidToken) {
        return res.status(401).json({ msg: 'Invalid token' })

    } else {
        return res.status(200).json({ msg: ' token valido' })

    }

}

const updatePassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const user = await User.findOne({ token })

    if (!user) {
        return res.status(401).json({ msg: 'Invalid token' })

    }
    try {
        user.token = ''
        user.password = password
        await user.save()
        return res.status(200).json({ msg: ' password updated' })


    } catch (e) {
        return res.status(401).json({ msg: 'Error in new Password' })

    }
}
const user = async (req, res) => {
    const { user } = req
    res.json(user)
}

const admin = async (req, res) => {
    const { user } = req
    if(user.admin){

        return res.json(user)
    }

    return res.status(401).json({ msg: 'Un autohorized' })

}




export { admin, login, register, resetPassword, updatePassword, user, verifyPasswordResetToken, verifyToken }

