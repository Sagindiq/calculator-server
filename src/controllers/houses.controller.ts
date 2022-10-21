import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Houses } from "../entities/house.entity";
import { ErrorHandler } from "../errors/error.handler";
import { housePostValidation } from "../validation/houses.validation";

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allHouses = await dataSource.getRepository(Houses).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allHouses) res.json(allHouses)
    },

    POST: async(req: Request, res: Response, next: NextFunction) => {
        const { error, value } = housePostValidation.validate(req.body)

        if (error) {
            return next(new ErrorHandler(error.message, 404))
        }

        const { room_count, house_size, ms_cost, address, complex_id } = value

        const newHouse = await dataSource
            .createQueryBuilder()
            .insert()
            .into(Houses)
            .values({
                room_count,
                house_size,
                ms_cost,
                address,
                complex: complex_id
            })
            .execute()

        return res.json(newHouse)
    }
}