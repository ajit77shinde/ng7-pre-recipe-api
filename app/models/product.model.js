const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ProductSchema = new Schema({
    name: {type: String, required: true, max:100},
    prise: {type:Number, required: true},
});
// Export the module
moduale.exports = mongoose.model('Product','ProductSchema');
