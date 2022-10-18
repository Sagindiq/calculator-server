import { ErrorHandler } from "../errors/error.handler";
import { NextFunction, Response, Request } from "express";

export const errorHandle = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status).json({
        message: err.message,
        status: err.status
    })
}