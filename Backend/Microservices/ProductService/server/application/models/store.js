const StoreSchema = new mongooseSchema({
    storeName: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    branchName: {
        type: String,
    },
    storeAddress: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    pincode: {
        type: Number,
        default: '',
        required: false,
        trim: true,
    },
    storeLogo: {
        type: String,
        required: false,
        default: ""

    },
    website: {
        type: String,
        required: false,
        default: ""

    },
    email: {
        type: String,
        required: false,
        default: ""

    },
    storeRatings: {
        type: String,
        default: 5
    },
    isStoreActive: {
        type: Boolean,
        default: false,
        required: false,
        trim: true
    },
    deleted: {
        type: Boolean,
        required: false,
        default: true,
        trim: true
    },
    vendorId: {
        type: mongoose.Schema.ObjectId,
        required:true
    }
});



StoreSchema.plugin(mongoose_timestamps);
StoreSchema.plugin(mongoose_softDelete);



function stringNotNull(obj) {
    return obj.length
}

// StoreSchema.pre("save", async function (next) {
//     // convert email to lowercase
//     this.email = this.email.toLowerCase();

//     //check uniqueness of email.
//     const [err, Store] = await To(domain.User.findOne({
//         email: this.email
//     }, 'email'));

//     if (err) return next(err);

//     if (user) {
//         this.invalidate("email", "email must be unique");
//         return next(new Error("email must be unique"));
//     }

//     next();
// });

var Store = mongoose.model('Store', StoreSchema);
module.exports = Store