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

    }
}