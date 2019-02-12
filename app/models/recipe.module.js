const mongoose = require('mongoose');


const RecipeSchema = mongoose.Schema({
    title: String,
    description: String,
    ingredients: String,
    detail: String
},{
    timestamp: true
});

module.exports = mongoose.model('Recipe',RecipeSchema)