import { Router } from "express";
import companyController from "../../controllers/company.controller";

const companiesRouter = Router()

export default companiesRouter
    .get('/companies', companyController.GET)
    .get('/companies/:id', companyController.GET_ONE)
    .get('/companies-complex', companyController.GET_WITH_COMPLEX)
    .post('/new-company', companyController.POST)