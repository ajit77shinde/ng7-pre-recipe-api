const mongoose = require('mongoose');


const RecipeSchema = mongoose.Schema({
    title: String,
    description: String
},{
    timestamp: true
});

module.exports = mongoose.model('Recipe',RecipeSchema)