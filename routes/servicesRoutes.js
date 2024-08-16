import express from "express";
import { createServices, deleteService, getService, getServices, updateService } from "../controllers/serviceController.js";

const router = express.Router()

router.route('/')
    .post(createServices)
    .get(getServices)

router.route('/:id')
    .get(getService)
    .put(updateService)
    .delete(deleteService)




export default router