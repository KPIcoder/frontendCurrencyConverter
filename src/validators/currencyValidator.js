import Joi from "joi";

const currencyValidator = Joi.object({
    currencyFullName: Joi.string().min(5).max(99).required(),
    currencyShortName: Joi.string().length(3).required(),
    currencyRateByUSD: Joi.number().required()
})

export {currencyValidator};
