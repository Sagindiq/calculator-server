import joi from 'joi'

export const complexPostFilter = joi.object().keys({
    complex_name: joi.string().required(),
    company_id: joi.string().required()
})