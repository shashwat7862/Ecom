
var CartSchema = new mongooseSchema({
    productId: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },

    productName: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    UserId: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
   
    category: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },

    subCategory: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    productCount: {
        type: Number,
        default: 0,
        required: true,
        trim: true,
    },
    
});



var Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart

