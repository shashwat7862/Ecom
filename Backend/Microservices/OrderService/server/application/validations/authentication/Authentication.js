const login = {
    body: {
        // mobile: Joi.number().max(10).required(),
    }
}

const logout = {
    params: {
        token: Joi.string().required().required()
    }
}

const forgotPassword = {
    body: {
        appName: Joi.string().required(),
        email: Joi.string().email().required()
    }
}

const resetPassword = {
    params: {
        token: Joi.string().required()
    },
    body: {
        newpassword: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).min(6).max(30).required()
    }
}

const verifyEmail = {
    params: {
        token: Joi.string().required()
    }
}

const validateAuthToken = {
    params: {
        token: Joi.string().required()
    }
}

module.exports = {
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    validateAuthToken
}