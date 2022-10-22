import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Houses } from "../entities/house.entity";
import { ErrorHandler } from "../errors/error.handler";
import { housePostValidation, houseGetValidation } from "../validation/houses.validation";
import uuid from 'uuid'

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allHouses = await dataSource.getRepository(Houses).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allHouses) res.json(allHouses)
    },

    GET_ONE: async(req: Request, res: Response, next: NextFunction) => {

        const { error, value } = houseGetValidation.validate(req.params)

        if (error) {
            return next(new ErrorHandler(error.message, 503))
        }

        const { complex_id, room_count } = value
        
        const house = await dataSource
            .getRepository(Houses)
            .createQueryBuilder('house')
            .where('house.complex = :complex_id', { complex_id })
            .andWhere('house.room_count = :room_count', { room_count }).getMany()

            if(house.length < 1) return next(new ErrorHandler('not found any data', 404)) 

            return res.json(house[0])
    },

    // GET_BY_COMPLEX: async(req: Request, res: Response, next: NextFunction) => {
    //     const { id } = req.params

    //     const findHouses = await dataSource.getRepository(Houses).createQueryBuilder('house')
    //     .where('house.complex = :id', { id }).getMany()

    //     if(!findHouses) next(new ErrorHandler('Not found any data', 404))

    //     res.json(findHouses)
    // },

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