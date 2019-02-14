module.exports = (app) => {
    const recipe = require('../controllers/recipe.controller');

    // create new Recipe
    app.post('/recipes',recipe.create);
    
    //upload image 
    app.post('/recipes/image_upload',recipe.saveImag);
    
    //Retrive all Notes
    app.get('/recipes',recipe.findAll);

    // Retrive a single recipe with note Id
    app.get('/recipes/:recipeId', recipe.findOne);

    //Update a recipe with recipeId
     app.put('/recipes/:recipeId',recipe.update);

     //Delete a Note with noteId
     app.delete('/recipe/:noteId', recipe.delete);
}