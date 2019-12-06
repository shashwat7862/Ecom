const SellerSchema = new mongooseSchema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    sellerImage: {
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
        required: true,
        trim: true
    },
    salt: {
        type: String,
        default: '',
        required: true,
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
        type: Number,
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
    role: {
        type: String,
        trim: true,
        default: 'ROLE_Seller',
        enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN', 'ROLE_Seller']
    }
});

SellerSchema.pre('findOneAndUpdate', function(next) {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    this.options.runValidators = true;
    next();
});

SellerSchema.plugin(mongoose_timestamps);
SellerSchema.plugin(mongoose_softDelete);

//configuring different access level for the Seller
SellerSchema.plugin(require('mongoose-role'), {
    roles: configHolder.config.roles,
    accessLevels: configHolder.config.accessLevels
});

function stringNotNull(obj) {
    return obj.length
}

SellerSchema.pre("save", async function(next) {
    // convert email to lowercase
    this.email = this.email.toLowerCase();

    //check uniqueness of email.
    const [err, Seller] = await To(domain.Seller.findOne({
        email: this.email
    }, 'email'));

    if (err) return next(err);

    if (Seller) {
        this.invalidate("email", "email must be unique");
        return next(new Error("email must be unique"));
    }

    next();
});

var Seller = mongoose.model('Seller', SellerSchema);
module.exports = Seller