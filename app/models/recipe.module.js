const mongoose = require('mongoose');
const RecipeSchema = mongoose.Schema({
    title: {type: String, required: true, default: ""},
    description: {type: String, required: true, default: ""},
    ingredients: String,
    detail: String,
    imgUrl: {type: String, required: true, default: ""}
},{
    timestamp: true
});
module.exports = mongoose.model('Recipe',RecipeSchema)