import { Router } from "express";
import complexController from "../../controllers/complex.controller";

const complexRouter = Router()

export default complexRouter
    .get('/complexes', complexController.GET)