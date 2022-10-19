import { Router } from "express";
import companyController from "../../controllers/company.controller";

const companiesRouter = Router()

export default companiesRouter
    .get('/companies', companyController.GET)
    .post('/new-company', companyController.POST)