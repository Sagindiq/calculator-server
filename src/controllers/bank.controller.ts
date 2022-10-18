import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Banks } from "../entities/banks.entity";
import { ErrorHandler } from "../errors/error.handler";

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allBanks = await dataSource.getRepository(Banks).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allBanks) res.json(allBanks)
    }
}