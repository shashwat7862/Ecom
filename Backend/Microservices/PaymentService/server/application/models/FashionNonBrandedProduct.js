var FashionNonBrandedProductSchema = new mongooseSchema({
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
        required: true,
        trim: true,
    },
    modelNo: {
        type: String,
        default: '',
        required: true,
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
        required: true,
        trim: true
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    pincode: {
        type: Number,

        required: true,
    },
    dealerName: {
        type: String,
        trim: true,
        required: true,
    },

    color: {
        type: String,
        default: '',
        trim: true,
    },
    description: {
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
    isBranded: {
        type: Boolean,
        default: false,
    },
    no_of_pics: {
        type: Number,
        default: '',
        required: true,
        trim: true
    },
    perPiecesAmount: {
        type: Number,

    },
    minNumberOfOrder: {
        type: Number,
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
    range: [{
        type: String,

    }]
});



var FashionNonBrandedProduct = mongoose.model('FashionNonBrandedProduct', FashionNonBrandedProductSchema);
module.exports = FashionNonBrandedProduct