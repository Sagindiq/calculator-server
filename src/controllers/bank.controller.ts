import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Banks } from "../entities/banks.entity";
import { ErrorHandler } from "../errors/error.handler";
import { bankPostValidator } from "../validation/bank.validation";
import { bankCreditValidator } from "../validation/bankCredits.validation";

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allBanks = await dataSource.getRepository(Banks).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allBanks) res.json(allBanks)
    },

    GET_BY_YEAR: async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = bankCreditValidator.validate(req.params)

        if (error) {
            return next(new ErrorHandler(error.message, 400))
        }

        const { duration } = value

        const allBankCredits = await dataSource.getRepository(Banks).find({
            where: {
                mortgage_duration: duration
            }
        }).catch(err => next(new ErrorHandler(err.message, 503)))

        if (allBankCredits) res.json(allBankCredits)
    },

    POST: async(req: Request, res: Response, next: NextFunction) => {

        const { error, value } = bankPostValidator.validate(req.body)
        

        if (error) {
            return next(new ErrorHandler(error.message, 400))
        }

        const { bank_name, bank_image, bank_service, mortgage_duration, max_mortgage, starting_payment } = value

        const newBank = await dataSource.createQueryBuilder()
            .insert()
            .into(Banks)
            .values({
                bank_name,
                bank_image,
                bank_service,
                mortgage_duration,
                max_mortgage,
                starting_payment
            })
            .execute()

        return res.json(newBank)

    },

    GET_CALCULATE: async(req: Request, res: Response, next: NextFunction) => {
        const { house_size, ms_cost, mortgage_duration } = req.headers

        if (!house_size || !ms_cost || !mortgage_duration) {
            return next(new ErrorHandler('Bad request', 400))
        }

        const houseSize: number = +house_size
        const msCost: number = +ms_cost
        const mDuration: number = +mortgage_duration

        const totalCost: number = msCost * houseSize;

        const banks = await dataSource.getRepository(Banks).find({
            where: {
                mortgage_duration: mDuration
            }
        })

        let residual = []

        banks.map(el => {

            if (el.max_mortgage >= totalCost) {
                const minus = el.max_mortgage - totalCost
                residual.push(minus)
            }
        })

        const bank = banks.find(el => {
            return el.max_mortgage - totalCost == Math.min(...residual)
        })

        const starting_payment = (totalCost / 100) * bank.starting_payment
        const bank_service = Number(bank.bank_service)
        
        const monthly_payment = totalCost - starting_payment - bank_service

        const result = {
            bank_name: bank.bank_name,
            bank_image: bank.bank_image,
            total_cost: totalCost,
            starting_payment,
            bank_service,
            monthly_payment,
            mortgage_duration: mDuration
        }

        return res.json(result)
    }
}