import { Router } from "express";
import housesController from "../../controllers/houses.controller";

const housesRouter = Router()

export default housesRouter
    .get('/houses', housesController.GET)
    // .get('/houses/:id', housesController.GET_BY_COMPLEX)
    .get('/house/:complex_id/:room_count', housesController.GET_ONE)
    .post('/new-house', housesController.POST)