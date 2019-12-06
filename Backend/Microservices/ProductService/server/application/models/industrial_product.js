 var IndustrialProduct = new mongooseSchema({
     category: {
         type: String,
         default: 'Industry',
         required: false,
         trim: true,
     },

     subCategory: {
         type: String,
         default: 'Industry Parts',
         required: false,
         trim: true
     },
     productName: {
         type: String,
         default: 'default',
         required: true,
         trim: true,
     },
     productImage: {
         type: String,
         default: null,
         required: false,
         trim: true,
     },
 
     area: {
         type: String,
         default: '',
         required: true,
         trim: false
     },
     city: {
         type: String,
         trim: true,
         required: true,
     },
     pincode: {
         type: Number,

         required: false,
     },
     mobile: {
         type: Number,
         trim: true,
         required: true,
     },
     description: {
         type: String,
         default: '',
         trim: true,
     },
     modelNo: {
         type: String,
         default: '',
         required: false,
         trim: true
     },
     isVerfiedByUs:{
        type: String,
        default: false,
        required: false,
        trim: true
    },

     brandName: {
         type: String,
         default: '',
         required: false,
         trim: true
     },
     isBranded: {
         type: Boolean,
         default: false,
     },
     productStatus: {
         type: Boolean,
         default: true,
         trim: true
     },price:{
         type:Number,
         default:0,
         trim:true,
         required:true
     },approval:{
         type:Boolean,
         required:false
     }
 });



 var industrialProduct = mongoose.model('industrialProduct', IndustrialProduct);
 module.exports = industrialProduct



  