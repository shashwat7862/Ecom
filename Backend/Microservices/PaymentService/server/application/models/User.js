const UserSchema = new mongooseSchema({
    fullName: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    
    email: {
        type: String,
        default: '',
        required: false,
        trim: true,
        unique: true
    },
    userImage: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    mobile: {
        type: Number,
        default: '',
        required: true,
        trim: true,
        unique: true
    },
    deleted:{
        type:Boolean,
        required: false,
        default:false

    },
    isAccountLocked: {
        type: Boolean,
        default: false,
        required: false,
        trim: true
    },
    isAccountActive: {
        type: Boolean,
        required: false,
        default: true,
        trim: true
    }
});

 

UserSchema.plugin(mongoose_timestamps);
UserSchema.plugin(mongoose_softDelete);

 

function stringNotNull(obj) {
    return obj.length
}

// UserSchema.pre("save", async function (next) {
//     // convert email to lowercase
//     this.email = this.email.toLowerCase();

//     //check uniqueness of email.
//     const [err, user] = await To(domain.User.findOne({
//         email: this.email
//     }, 'email'));

//     if (err) return next(err);

//     if (user) {
//         this.invalidate("email", "email must be unique");
//         return next(new Error("email must be unique"));
//     }

//     next();
// });

var User = mongoose.model('User', UserSchema);
module.exports = User