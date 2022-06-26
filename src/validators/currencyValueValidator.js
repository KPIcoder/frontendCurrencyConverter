import Joi from "joi";

const currencyValueValidator = Joi.object({
    currencyValue: Joi.number().greater(0)
})

export {currencyValueValidator};
