import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Companies } from "../entities/companies.entity";
import { Complexes } from "../entities/complex.entity";
import { ErrorHandler } from "../errors/error.handler";
import { complexPostFilter } from "../validation/complex.validation";

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allComplexes = await dataSource.getRepository(Complexes).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allComplexes) res.json(allComplexes)
    },

    GET_ONE: async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        const complex = await dataSource.getRepository(Complexes).find({
            where: { id }
        })

        if (complex) res.json(complex[0])
    },

    GET_BY_COMPANY: async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        // const complexes = await dataSource.getRepository(Complexes).createQueryBuilder('complexes').leftJoin('complexes', 'complexes.company').getMany()

        // const complexes = await dataSource.getRepository(Complexes).find({
        //     relations: { company: true, house: true },
        //     where: { companyId: id}
        // })
        
        // const c = await dataSource.getRepository(Complexes).find({
        //     relations: {
        //         company: true,
        //         house: true
        //     },
            
        // })

        // const c = await dataSource.getRepository(Complexes).createQueryBuilder('complex')
        // .leftJoinAndSelect('complex.house', 'houses')
        // .where('complex.company = :id', { id }).innerJoinAndSelect('complex.house', 'house').getMany()

        // const c = await dataSource.getRepository(Complexes)
        // .createQueryBuilder('complex')

        // const c = await dataSource.getRepository(Complexes).createQueryBuilder('complex')
        // .leftJoinAndSelect('complex.company', 'company')
        // .leftJoinAndSelect('complex.house', 'house')
        // .where('complex.company = :id', {id})
        // .getMany()

        // console.log(c);

        // const complexes = await dataSource.getRepository(Complexes).find({
        //     relations: {
        //         company: true
        //     }
        // })

        const findComplexes = await dataSource.getRepository(Complexes).createQueryBuilder('complex')
        .where('complex.company = :id', { id }).getMany()

        if(findComplexes) res.json(findComplexes)
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
                company: company_id
            })
        .execute()

        return res.json(newComplex)
            
    }
}