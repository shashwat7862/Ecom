
var AgricultureAndFoodSchema = new mongooseSchema({
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

    brandName: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    no_of_weight: {
        type: Number,
        default: '',
        required: true,
        trim: true
    },
    perUnitAmount: {
        type: Number,
        trim: true
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
        trim: true
    }]
});



var AgricultureAndFood = mongoose.model('AgricultureAndFood', AgricultureAndFoodSchema);
module.exports = AgricultureAndFood


