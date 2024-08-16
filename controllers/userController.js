import Appointment from "../models/Appointment.js"

const getAppointments = async (req, res) => {

    const { user } = req.params
    if (user !== req.user._id.toString()) {
        return res.status(403).json({ msg: 'Unautoraizhed' })

    }
    try {

        const query = req.user.admin ? { date: { $gte: new Date() } } : { user, date: { $gte: new Date() } }
        const appointments = await Appointment.find(query)
            .populate('services')
            .populate({path:'user',select:'name email'})
            .sort({ date: 'asc' })
        return res.json(appointments)
    }
    catch (e) {

    }
    res.status(403).json({ msg: 'no dates' })
}
export {
    getAppointments
}

