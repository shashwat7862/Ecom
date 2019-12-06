
const VerificationTokenSchema = new mongooseSchema({
    verificationToken: {
        type: String,
        default: '',
        required: true,
        trim: true,
        validate: [stringNotNull, 'Verification token required']
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
        ref:'user'
    }
});

function stringNotNull(obj){
    return obj.length
}

VerificationTokenSchema.plugin(mongoose_softDelete);
VerificationTokenSchema.plugin(mongoose_timestamps);

var VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);
module.exports = VerificationToken