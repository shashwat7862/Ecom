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
        type: String
    },
    productId: {
        type: String
    },
     productName: {
        type: String
    }
});

 


var productReview = mongoose.model('productReview', ProductReviewSchema);
module.exports = productReview