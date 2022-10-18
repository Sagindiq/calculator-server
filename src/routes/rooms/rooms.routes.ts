import { Router } from "express";
import roomsController from "../../controllers/rooms.controller";

const roomsRouter = Router()

export default roomsRouter
    .get('/rooms', roomsController.GET)