const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    description: String,
    detail: String,
    ingredients: String
},{
    timestamp: true
});

module.exports = mongoose.model('Note',NoteSchema);
