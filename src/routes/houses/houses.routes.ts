import { Router } from "express";
import housesController from "../../controllers/houses.controller";

const housesRouter = Router()

export default housesRouter
    .get('/houses', housesController.GET)
    .post('/new-house', housesController.POST)