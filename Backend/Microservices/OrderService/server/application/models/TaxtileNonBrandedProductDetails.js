
var TaxtileNonBrandedProductDetailsSchema = new mongooseSchema({
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
    brandName: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    modelNo: {
        type: String,
        default: '',
        required: true,
        trim: true
    },

    description: {
        type: Object,
        default: '',
        trim: true,
    },

    brandName: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    isbranded: {
        type: Boolean,
        default: false,
    },

});

var TaxtileNonBrandedProductDetails = mongoose.model('TaxtileNonBrandedProductDetails', TaxtileNonBrandedProductDetailsSchema);
module.exports = TaxtileNonBrandedProductDetails

