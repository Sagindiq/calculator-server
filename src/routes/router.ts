import { Router } from "express";
import companiesRoutes from "./companies/companies.routes";
import complexesRoutes from "./complexes/complexes.routes";
import roomsRoutes from "./rooms/rooms.routes";
import banksRoutes from './banks/banks.routes'

const router = Router()

export default router.use([ companiesRoutes, complexesRoutes, roomsRoutes, banksRoutes])