const RegistrationTokenSchema = new mongooseSchema({
    registrationToken: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        trim: true,
        validate: [stringNotNull, 'Email required']
    },
    user: {
        type: mongooseSchema.ObjectId,
        ref: 'user',
        required: true
    },
    forgotPasswordToken: {
        type: String,
        default: '',
        trim: true
    }
});


function stringNotNull(obj) {
    return obj.length
}

RegistrationTokenSchema.plugin(mongoose_softDelete);
RegistrationTokenSchema.plugin(mongoose_timestamps);

var RegistrationToken = mongoose.model('RegistrationToken', RegistrationTokenSchema);
module.exports = RegistrationToken