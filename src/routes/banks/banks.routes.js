import { Router } from 'express'
import bankController from '../../controllers/bank.controller'
import bankCreditsController from '../../controllers/bankCredits.controller'

const bankRouter = Router()

export default bankRouter
    .get('/banks', bankController.GET)
    .get('/bank-credits/:duration', bankCreditsController.GET)