
var CartSchema = new mongooseSchema({
    productDetails: [
        {
            productId: String,
            productName: String,
            price: Number,
            productCount: Number,
            productImage: String,
            category: String,
            VendorId: String,
            VendorName: String,
        }
    ],
    UserId: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
});



CartSchema.plugin(mongoose_timestamps);
CartSchema.plugin(mongoose_softDelete);



var Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart

