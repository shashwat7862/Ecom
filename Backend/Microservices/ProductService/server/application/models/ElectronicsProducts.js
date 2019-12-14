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
    title: {
        type: String,
        max: 100,
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

    vendorName: {
        type: String,
        trim: true,
    },
    vendorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'Vendor'
    },
    productDescription: {
        type: String,
    },


    brandName: {
        type: String,
        default: '',
        required: true,
        trim: true
    },
    attributes: {
        waist: String,
        color: String,
        size: String,
        Material_type:String
    },
    price: {
        type: Number,
        default: '',
        required: true,
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



ElectronicProductSchema.plugin(mongoose_timestamps);
ElectronicProductSchema.plugin(mongoose_softDelete);




var ElectronicProduct = mongoose.model('ElectronicProduct', ElectronicProductSchema);
module.exports = ElectronicProduct