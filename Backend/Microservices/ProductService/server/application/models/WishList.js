
var WishListSchema = new mongooseSchema({
    productDetails: [
        {
            productId: String,
            productName: String,
            price: Number,
            category: String
        }
    ],
    UserId: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
});



WishListSchema.plugin(mongoose_timestamps);
WishListSchema.plugin(mongoose_softDelete);



var WishList = mongoose.model('WishList', WishListSchema);
module.exports = WishList

