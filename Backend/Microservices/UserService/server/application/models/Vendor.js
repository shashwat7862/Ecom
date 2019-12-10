const VendorSchema = new mongooseSchema({
    fullName: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    VendorImage: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    state: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },

    country: {
        type: String,
        default: '',
        required: false,
        trim: true,
        unique: true
    },
    city: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    password: {
        type: String,
        default: '',
        required: false,
        trim: true
    },
    salt: {
        type: String,
        default: '',
        required: false,
        trim: true
    },

    business_name: {
        type: String,
        default: '',
        required: false,
        trim: true,
        unique: true
    },
    business_category: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },

    address: {
        type: String,
        default: '',
        required: false,
        trim: true,
        unique: true
    },

    pincode: {
        type: Number,
        required: false,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    account_no: {
        type: Number,
        required: false,
        trim: true
    },
    IFSC: {
        type: String,
        default: '',
        required: false,
        trim: true
    },
    isAccountLocked: {
        type: Boolean,
        default: false,
        trim: true
    },
    isAccountActive: {
        type: Boolean,
        default: true,
        trim: true
    },
    GST_number: {
        type: String,
        trim: true,
        required: false
    },
    Pan_number: {
        type: String,
        trim: true,
        required: false
    },
    loginFrom: {
        type: String,
        trim: true,
        required: false
    },
    role: {
        type: String,
        trim: true,
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

VendorSchema.pre('findOneAndUpdate', function (next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    this.options.runValidators = true;
    next();
});

VendorSchema.plugin(mongoose_timestamps);
VendorSchema.plugin(mongoose_softDelete);

 

var Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor