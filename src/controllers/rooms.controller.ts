import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Rooms } from "../entities/rooms.entity";
import { ErrorHandler } from "../errors/error.handler";

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        const allRooms = await dataSource.getRepository(Rooms).find().catch(err => next(new ErrorHandler(err.message, 503)))

        if(allRooms) res.json(allRooms)
    }
}