
var TaxtileBrandedProductDetailsSchema = new mongooseSchema({
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
    isbranded: {
        type: Boolean,
        default: true,
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

var TaxtileBrandedProductDetails = mongoose.model('TaxtileBrandedProductDetails', TaxtileBrandedProductDetailsSchema);
module.exports = TaxtileBrandedProductDetails

