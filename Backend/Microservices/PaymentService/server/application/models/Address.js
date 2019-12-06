
 const AddressSchema = new mongooseSchema({
	addressLine1: {
		type: String,
		default: '',
		required: true,
		trim: true,
        validate: [stringNotNull, 'address required']
	}, 
    addressLine2: {
		type: String,
		default: '',
		required: true,
		trim: true
	},
    city: {
		type: String,
		default: '',
		required: true,
		trim: true
	},
    state: {
		type: String,
		default: '',
		required: true,
		trim: true
	},
    country: {
		type: String,
		default: '',
		required: true,
		trim: true
	}
});


function stringNotNull(obj){
    return obj.length
}

AddressSchema.plugin(mongoose_softDelete);
AddressSchema.plugin(mongoose_timestamps);

var Address = mongoose.model('Address', AddressSchema);
module.exports = Address
