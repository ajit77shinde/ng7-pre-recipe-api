// import multer=require('multer')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})
const multerUploads = multer({ storage }).single('image');
module.exports = (app) => {
    const recipe = require('../controllers/recipe.controller');

    // create new Recipe
    app.post('/recipes',recipe.create);
    
    //upload image 
    app.post('/recipes/image_upload',multerUploads,recipe.image_upload);
    
    app.get('/recipes',recipe.findAll);

    // Retrive a single recipe with note Id
    app.get('/recipes/:recipeId', recipe.findOne);

    //Update a recipe with recipeId
     app.put('/recipes/:recipeId',recipe.update);

     //Delete a Note with noteId
     app.delete('/recipe/:noteId', recipe.delete);
}