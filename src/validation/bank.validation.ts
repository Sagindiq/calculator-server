import joi from 'joi'

export const bankPostValidator = joi.object().keys({
    bank_name: joi.string().required(),
    bank_image: joi.string().required(),
    bank_service: joi.number().required(),
    mortgage_duration: joi.number().required().valid(10, 15, 20),
    max_mortgage: joi.number().required(),
    starting_payment: joi.number().required()
})