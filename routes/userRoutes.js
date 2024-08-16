import express from "express";
import { getAppointments } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/:user/appointments')
    .get(authMiddleware,getAppointments)

export default router