const createUser = {
    body: {
        fullName: Joi.string().min(3).max(30).required(),
        mobile: Joi.number().min(10).required(),
        // password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).min(6).max(30).required()
    }
}

const getUser = {
    params: {
        id: Joi.string().required()
    }
}

const updateUser = {
    params: {
        id: Joi.string().required()
    },
    body: {
        firstName: Joi.string().min(3).max(30),
        lastName: Joi.string().min(3).max(30),
        email: Joi.string().email(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).min(6).max(30)
    }
}

const deleteUser = {
    params: {
        id: Joi.string().required()
    }
}

const searchUser = {
    query: {
        value: Joi.string()
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    searchUser
}