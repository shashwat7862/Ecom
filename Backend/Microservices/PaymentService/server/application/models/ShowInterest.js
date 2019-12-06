var ShowInterest = new mongooseSchema({
    
    productName: {
        type: String,
        default: 'default',
        required: true,
        trim: true,
    },
    productId: {
        type: String,
        required: true,
        trim: true,
        ref:'industrialProduct'
    },
     
    city: {
        type: String,
        trim: true,
        required: true,
    },
    
    mobile: {
        type: Number,
        trim: true,
        required: true,
    },
     
    modelNo: {
        type: String,
        default: '',
        required: false,
        trim: true
    },
    price:{
        type:Number,
        default:0,
        trim:true,
        required:true
    }
});



var ShowInterest = mongoose.model('ShowInterest', ShowInterest);
module.exports = ShowInterest



 