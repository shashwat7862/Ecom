var ProductReviewSchema = new mongooseSchema({
    title: {
        type: String,
    },
    review: {
        type: String,
    },
    byUser: {
        type: String,
        trim: true,
        required: true

    },
    startRating:
    {
        type: String,
        default:'5'
    },
    productId: {
        type: String
    },
    productName: {
        type: String
    },
    productImage: {
        type: String
    },
    vendorName: {
        type: String
    },
    vendorId: {
        type: String
    }
});

ProductReviewSchema.plugin(mongoose_softDelete);
ProductReviewSchema.plugin(mongoose_timestamps);



var productReview = mongoose.model('productReview', ProductReviewSchema);
module.exports = productReview