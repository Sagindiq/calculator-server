import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Rooms } from "../entities/rooms.entity";
import { ErrorHandler } from "../errors/error.handler";
import { roomPostFilter } from "../validation/rooms.validation";

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allRooms = await dataSource.getRepository(Rooms).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allRooms) res.json(allRooms)
    },

    POST: async(req: Request, res: Response, next: NextFunction) => {
        const { error, value } = roomPostFilter.validate(req.body)

        if (error) {
            return next(new ErrorHandler(error.message, 4004))
        }

        const { room_count, room_size, ms_cost, address, complex_id } = value

        const newRoom = await dataSource
            .createQueryBuilder()
            .insert()
            .into(Rooms)
            .values({
                room_count,
                room_size,
                ms_cost,
                address,
                complex: complex_id
            })
            .execute()

        return res.json(newRoom)
    }
}