
var QuotationSchema = new mongooseSchema({
    name: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },

    email: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    productInfo: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: false,
        trim: true,
    },

    mobile: {
        type: Number,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        default: '',
        required: true,
        trim: true
    }
});



var Quotation = mongoose.model('Quotation', QuotationSchema);
module.exports = Quotation

