const Recipe = require('../models/recipe.module');

// create and save the Recipe
exports.create = (req, res) => {
    // console.log('in recipe controller', req.body)
    //Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Recipe Description can not empty"
        });
    }
    // create a Recipe
    const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        detail: req.body.detail,
        ingredients: req.body.ingredients
    });
    // console.log("recipes-------------", recipe)
    //save recipe in Database
    recipe.save()
        .then(data => {
            // console.log(data);
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocure while creating the recipe"
            });
        });
};
//Retrive and returen all recipes from the database
exports.findAll = (req, res) => {
    Recipe.find()
        .then(recipe => {
            res.send(recipe);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocure while retriving the recipes."
            });
        });
};

//find a single recipe with a recipeId
exports.findOne = (req, res) => {

}
//update a note identified by the recipeId in request
exports.update = (req, res) => {

};
//Delete a recipe with the specified noteId inn request
exports.delete = (req, res) => {

}








