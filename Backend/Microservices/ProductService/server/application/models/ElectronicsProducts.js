var ElectronicProductSchema = new mongooseSchema({
    category: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },

    subCategory: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    productName: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    productImage: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    modelNo: {
        type: String,
        default: '',
        required: false,
        trim: true
    },
    Material_type: {
        type: String,
        default: "",
        trim: true,
        required: false,
    },
    shopName: {
        type: String,
        default: '',
        trim: true
    },
    area: {
        type: String,
        default: '',
        trim: true
    },
    city: {
        type: String,
        trim: true,
    },
    pincode: {
        type: Number,
    },
    dealerName: {
        type: String,
        trim: true,
    },
    productDescription: [{
        data: String,
    }],

    color: {
        type: String,
        default: '',
        trim: true,
    },

    brandName: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: '',
        required: true,
        trim: true
    },
    dealerStatus: {
        type: Boolean,
        default: true,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true,
        trim: true
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

});



var ElectronicProduct = mongoose.model('ElectronicProduct', ElectronicProductSchema);
module.exports = ElectronicProduct