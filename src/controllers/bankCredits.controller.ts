// import { NextFunction, Request, Response } from "express";
// import { dataSource } from "../config/ormconfig";
// import { BankCredits } from "../entities/bankCredits.entity";
// import { ErrorHandler } from "../errors/error.handler";
// import { bankCreditValidator } from "../validation/bankCredits.validation";

// export default {
//     GET: async(req: Request, res: Response, next: NextFunction) => {
//         const { error, value } = bankCreditValidator.validate(req.params)

//         if (error) {
//             return next(new ErrorHandler(error.message, 400))
//         }

//         const { duration } = value

//         const allBankCredits = await dataSource.getRepository(BankCredits).find({
//             where: {
//                 mortgage_duration: duration
//             }
//         }).catch(err => next(new ErrorHandler(err.message, 503)))

//         if(allBankCredits) res.json(allBankCredits)
//     }
// }