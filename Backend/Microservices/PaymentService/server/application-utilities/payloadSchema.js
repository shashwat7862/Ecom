const Joi = require('joi');


let registrationPayload = Joi.object().keys({
    name: Joi.string()
});

exports.module = { registrationPayload }

// firstName: Joi.string(),
// lastName: Joi.string(),
// email: Joi.string(),
// password: Joi.string(),
// mobile: Joi.number()