import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Complexes } from "../entities/complex.entity";
import { ErrorHandler } from "../errors/error.handler";
import { complexPostFilter } from "../validation/complex.validation";

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allComplexes = await dataSource.getRepository(Complexes).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allComplexes) res.json(allComplexes)
    },

    POST: async(req: Request, res: Response, next: NextFunction) => {
        const { error, value } = complexPostFilter.validate(req.body)

        if (error) {
            return next(new ErrorHandler(error.message, 400))
        }

        const { complex_name, company_id } = value
        
        const newComplex = await dataSource.createQueryBuilder()
            .insert()
            .into(Complexes)
            .values({
                complex_name,
                Company: company_id
            })
        .execute()

        return res.json(newComplex)
            
    }
}