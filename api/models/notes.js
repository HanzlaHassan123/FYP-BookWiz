const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true

    }
});
module.exports = mongoose.model('notes', NotesSchema);