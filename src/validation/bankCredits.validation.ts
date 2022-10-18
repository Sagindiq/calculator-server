import joi from 'joi'

export const bankCreditValidator = joi.object().keys({
    duration: joi.number().required().valid(10, 15, 20)
})