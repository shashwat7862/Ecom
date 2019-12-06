
var FashionNonBrandedProductDetailsSchema = new mongooseSchema({
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

});



var FashionNonBrandedProductDetails = mongoose.model('FashionNonBrandedProductDetails', FashionNonBrandedProductDetailsSchema);
module.exports = FashionNonBrandedProductDetails

