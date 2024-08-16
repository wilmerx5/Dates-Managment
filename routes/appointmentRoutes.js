import express from 'express'

import { createAppointment, deleteAppointment, getAppointmentById, getAppointmentsByDate, updateAppointment } from '../controllers/appointmentsController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/create',authMiddleware,createAppointment)
router.get('/',authMiddleware,getAppointmentsByDate)
router.get('/:id',authMiddleware,getAppointmentById)
router.put('/:id',authMiddleware,updateAppointment)
router.delete('/:id',authMiddleware,deleteAppointment)






export default router