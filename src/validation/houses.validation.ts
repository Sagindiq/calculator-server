import joi from 'joi'

export const housePostValidation = joi.object().keys({
    room_count: joi.number().required().valid(2, 3, 4, 5, 6),
    house_size: joi.number().required(),
    ms_cost: joi.number().required(),
    address: joi.string().required(),
    complex_id: joi.string().required()
})