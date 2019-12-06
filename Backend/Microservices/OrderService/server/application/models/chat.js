var chatSchema = new mongooseSchema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    message: {
        type: String,
        default: "",
        trim: true,
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    communication_Direction: {
        type: String,
        trim: true,
        required: true

    },
    fromName: {
        type: String,
        default: "",
        trim: true,
        required: false
    },
    toName: {
        type: String,
        default: "",
        trim: true,
        required: false
    }

});

function stringNotNull(obj) {
    return obj.length
}


var chat = mongoose.model('chat', chatSchema);
module.exports = chat