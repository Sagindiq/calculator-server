import joi from 'joi'


export const companyPostFilter = joi.object().keys({
    company_name: joi.string().required(),
    company_image: joi.string().required()
})