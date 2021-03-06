const Recipe = require('../models/recipe.module');
const cloudinary = require('cloudinary');
const config = require('../config/cloudinary.config').cloudinary;
const multer = require('multer');

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});
let imageData2;
// const multer = require('multer');
// const cloudinarImageUrl = "http://res.cloudinary.com/dqhg5acpy/image/upload/"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})

//Save the recipe Image
exports.image_upload = async (req, res) => {
    let imgFinalUrl;
    // console.log('file path of Image = ', req.file)
    console.log('Request body', req.body)

    let title = req.body.title;
    let description = req.body.description;
    let detail = req.body.detail;
    let ingredients = req.body.ingredients;
    await uploader(req, res, (isUploaded) => {
        if (isUploaded) {
            let imgUrl = isUploaded.url.split('/');
            imgFinalUrl = '' + imgUrl[6] + '/' + imgUrl[7] + '/' + imgUrl[8];
            console.log('imgFinalUrl=======', imgFinalUrl);


            //Validate request
            console.log('req.body.url==========', imgFinalUrl)
            if (!description) {
                return res.status(400).send({
                    message: "Recipe Description can not empty"
                });
            }
            // create a Recipe
            console.log("responce from cloudify", '' + imgFinalUrl)
            const recipe = new Recipe({
                title: title,
                description: description,
                detail: detail,
                ingredients: ingredients,
                imgUrl: imgFinalUrl
            });
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










        }
    });


}

async function uploader(req, res, callback) {
    let imageInfo;
    console.log('Enter in function ========');
    const upload = await multer({ storage }).single('image');
    await upload(req, res, await function (err) {
        console.log('Enter in 2 function');

        if (err) {
            console.log(err)
            return callback(false);
        }
        // SEND FILE TO CLOUDINARY
        const path = req.file.path
        const uniqueFilename = new Date().toISOString()

        cloudinary.v2.uploader.upload(
            path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, //directory and tags are optional
            function (err, image) {
                console.log('Enter in 3 function');

                if (err) return callback(false);
                //remove file from server
                const fs = require('fs');
                fs.unlinkSync(path)
                //return file details
                if (image) {
                    return callback(image);
                }
            }
        )
    })

}
// create and save the Recipe
exports.create = (req, res) => {
    console.log('in recipe controller', req)
    //Validate request
    // if (!req.body.description) {
    //     return res.status(400).send({
    //         message: "Recipe Description can not empty"
    //     });
    // }
    // // create a Recipe

    // // const imageResponce = saveImageCloudinary(req,res);
    // // console.log("responce from cloudify",imageResponce)
    // const recipe = new Recipe({
    //     title: req.body.title,
    //     description: req.body.description,
    //     detail: req.body.detail,
    //     ingredients: req.body.ingredients
    // });
    // // console.log("recipes-------------", recipe)
    // //save recipe in Database
    // recipe.save()
    //     .then(data => {
    //         // console.log(data);
    //         res.send(data);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error ocure while creating the recipe"
    //         });
    //     });
};

function saveImageCloudinary(req, res) {
    console.log('file path of Image cloudinary = ', req.file);
    console.log('Recipe data', req)
    const upload = multer({ storage }).single('name_of_input-key')
    upload(req, res, async function (err) {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        // SEND FILE TO CLOUDINARY
        const path = req.file.path
        const uniqueFilename = new Date().toISOString()

        await cloudinary.v2.uploader.upload(
            path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, //directory and tags are optional
            function (err, image) {
                if (err) return res.send(err)
                console.log('file uploded to Cloudinary11111111')
                //remove file from server
                const fs = require('fs');
                fs.unlinkSync(path)
                //return file details
                res.json(image);
            }
        )
    })
}

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