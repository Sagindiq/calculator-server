import { Request, Response, NextFunction } from "express";
import { dataSource } from "../config/ormconfig";
import { Companies } from "../entities/companies.entity";
import { ErrorHandler } from "../errors/error.handler";
import { companyPostFilter } from "../validation/company.validation";

export default {
    GET: async(_: Request, res: Response, next: NextFunction) => {
        const allCompanies = await dataSource.getRepository(Companies).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allCompanies) res.json(allCompanies)
    },

    POST: async(req: Request, res: Response, next: NextFunction) => {
        const { error, value } = companyPostFilter.validate(req.body)

        if(error) {
            return next(new ErrorHandler(error.message, 400))
        }

        const { company_name, company_image } = value

        const newCompany: object = await dataSource.createQueryBuilder()
            .insert()
            .into(Companies)
            .values({
                company_name,
                company_image
            })
            .execute()

        return res.json(newCompany)

    }
}