import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Complexes } from "../entities/complex.entity";
import { ErrorHandler } from "../errors/error.handler";

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allComplexes = await dataSource.getRepository(Complexes).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allComplexes) res.json(allComplexes)
    }
}