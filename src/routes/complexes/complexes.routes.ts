import { Router } from "express";
import complexController from "../../controllers/complex.controller";

const complexRouter = Router()

export default complexRouter
    .get('/complexes', complexController.GET)
    .get('/complex/:id', complexController.GET_ONE)
    .get('/complexes/:id', complexController.GET_BY_COMPANY)
    .post('/new-complex', complexController.POST)