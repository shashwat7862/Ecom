
var TaxtileNonBrandedProductSchema = new mongooseSchema({
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
    productImageUrl: {
        type: String,
        default: '',
        required: true,
        trim: true,
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
    modelNo: {
        type: String,
        default: '',
        required: true,
        trim: true
    },

    brandName: {
        type: String,
        default: '',
        required: true,
        trim: true
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

    }],
    isbranded: {
        type: Boolean,
        default: false,
    },
});



var TaxtileNonBrandedProduct = mongoose.model('TaxtileNonBrandedProduct', TaxtileNonBrandedProductSchema);
module.exports = TaxtileNonBrandedProduct

