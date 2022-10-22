import { Router } from 'express'
import bankController from '../../controllers/bank.controller'

const bankRouter = Router()

export default bankRouter
    .get('/banks', bankController.GET)
    .get('/banks/:duration', bankController.GET_BY_YEAR)
    .post('/new-bank', bankController.POST)
    .get('/calculate', bankController.GET_CALCULATE)