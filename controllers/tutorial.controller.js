const db = require("../models");
const Tutorial = db.tutorials;

//create and save a new tutorial
exports.create = (req, res) => {
    //      validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content cannot be empty!" });
    }
    //      Create
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    });
    //        save the tutorial
    tutorial
        .save(tutorial)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: err.message || "Some error has occured" });
        });
};

//retrieve all the tutorials
exports.findAll = (req, res) => {
    const title = req.query.title || "";
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong ."
            })
        })
};

//Find a single tutorial by its ID
exports.findOne = (req, res) => { };

//update a tutorial by its in the request
exports.update = (req, res) => { };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => { };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => { };
// Find all published Tutorials
exports.findAllPublished = (req, res) => { };
