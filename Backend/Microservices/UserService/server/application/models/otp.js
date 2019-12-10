var otpTokenSchema = new mongooseSchema({
    otp: {
        type: Number,
    },
    validUpto: {
        type: Date,
        default: Date.now
    },
    mobileNumber: {
        type: Number,
        trim: true,
        required: true

    },
    userRole: {
        type: String,
        trim: true,
        required: true
    },
    countrycode:
    {
        type: String
    }
});

function stringNotNull(obj) {
    return obj.length
}


var Otp = mongoose.model('Otp', otpTokenSchema);
module.exports = Otp