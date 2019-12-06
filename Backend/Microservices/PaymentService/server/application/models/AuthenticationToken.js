
 const AuthenticationTokenSchema = new mongooseSchema({
	 authToken: {
		type: String,
		default: '',
		required: true,
		trim: true,
        validate: [stringNotNull, 'Authentocation token required']
	}, 
    email: {
		type: String,
		default: '',
		required: true,
		trim: true,
        validate: [stringNotNull, 'Email required']
	}, 
    user: {
		type: mongooseSchema.ObjectId,
        ref:'user'
    }
});

AuthenticationTokenSchema.plugin(mongoose_timestamps);

function stringNotNull(obj){
    return obj.length
}

var AuthenticationToken = mongoose.model('AuthenticationToken', AuthenticationTokenSchema);
module.exports = AuthenticationToken