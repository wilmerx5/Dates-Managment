import { endOfDay, formatISO, isValid, parse, startOfDay } from "date-fns";
import { sendEmailCancelledAppointment, sendEmailNewAppointment, sendEmailUpdateAppointment } from "../emails/appointmentsEmail.js";
import Appointment from "../models/Appointment.js";
import { formatDate } from "../utils/date.js";
import { handleNotFound, validateObjectId } from "../utils/index.js";

const createAppointment = async(req,res)=>{
    const appointment = req.body
    appointment.user= req.user._id.toString()
    try{

        const newAppointment =  new Appointment(appointment)
        console.log(newAppointment)
       const result = await newAppointment.save()

        await sendEmailNewAppointment({
            date:formatDate(result.date),
            time:result.time
        })
        res.json({
            msg:'Reservation created successfully'
        })
    }
    catch(e){
        res.status(400).json({
            msg:'error creating reservation'
        })
    }
    
}

const getAppointmentById= async(req,res)=>{
    const {id} = req.params

    if(validateObjectId(id,res)) return

    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        handleNotFound(res)
        return
    }

    if(appointment.user.toString()!=req.user._id.toString()){
        return res.status(400).json({
            msg:'Un autorizhed'
        })
    }
    res.json(appointment)
}
const getAppointmentsByDate=async(req,res)=>{

    const {date} = req.query
    const newDate = parse(date,'dd/MM/yyyy',new Date())

    if(!isValid(newDate)){
        return res.status(400).json({
            msg:'INvalid date'
        })
    }
    const isoDate=formatISO(newDate)
    const appointments = await  Appointment.find({date:{
        $gte:startOfDay(new Date(isoDate)),
        $lte:endOfDay(new Date(isoDate))
    }}).select('time')
    res.json(appointments)
}

const updateAppointment = async(req,res)=>{
    const {id} = req.params

    if(validateObjectId(id,res)) return

    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        handleNotFound(res)
        return
    }

    if(appointment.user.toString()!=req.user._id.toString()){
        return res.status(400).json({
            msg:'Un autorizhed'
        })
    }

    const{date,time,totalAmount,services} = req.body
    appointment.date=date
    appointment.time=time
    appointment.totalAmount=totalAmount
    appointment.services=services

    try{
        const result= await appointment.save()
        await sendEmailUpdateAppointment({
            date:result.date,
            time:result.time
        })
       
        res.json({msg:'Date updated successfully'})
    }catch(e){
        res.status(400).json({msg:'error updating'})
    }
}

const deleteAppointment=async(req,res)=>{
    const {id} = req.params

    if(validateObjectId(id,res)) return

    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        handleNotFound(res)
        return
    }

    if(appointment.user.toString()!=req.user._id.toString()){
        return res.status(400).json({
            msg:'Un autorizhed'
        })
    }

    try{
        console.log(appointment)
       await appointment.deleteOne()
        await sendEmailCancelledAppointment({
            date:formatDate(appointment.date),
            time:appointment.time
        })
        return res.status(200).json({
            msg:'Successfully deleted'
        })
    }
    catch(e){
        return res.status(400).json({
            msg:'Error deleting appointment'
        })
    }
   
}
export {
    createAppointment, deleteAppointment, getAppointmentById, getAppointmentsByDate, updateAppointment
};

