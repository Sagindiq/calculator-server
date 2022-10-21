import { Router } from "express";
import companiesRoutes from "./companies/companies.routes";
import complexesRoutes from "./complexes/complexes.routes";
import housesRouter from "./houses/houses.routes";
import banksRoutes from './banks/banks.routes'

const router = Router()

export default router.use([ companiesRoutes, complexesRoutes, housesRouter, banksRoutes])