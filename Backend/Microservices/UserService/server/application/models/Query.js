
var QuerySchema = new mongooseSchema({
    title: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
        required: true,
        trim: true,
    },
   
    mobile: {
        type: Number,
        trim: true,
        required: true,
    },
    IssueType:{
        type: String,
        trim: true,
        required: true,
    }
    
});



var Query = mongoose.model('Query', QuerySchema);
module.exports = Query

