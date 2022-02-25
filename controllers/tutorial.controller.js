const db = require("../models");
const Tutorial = db.tutorials;

const getPagination = (page , size ) => { 
const limit = size ? +size : 3 ;
const offset = page ? page * limit : 0  ; 
return { limit , offset } ; 
} ; 


//retrieve all tuts from db 



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
exports.findAll = ( req, res,) => { 
  const { page , size , title } = req.query ; 
  var condition = title 
        ? { title: { $regex: new RegExp(title) , $options: "i" }  }
        : { } ; 
  const {limit , offset } = getPagination(page , size ) ;
  Tutorial.paginate(condition , { offset , limit } )
        .then( (data) => { 
          res.send({ 
            totalItems: data.totalDocs , 
            tutorials: data.docs , 
            totalPages: data.totalPages , 
            currentPage: data.page -1 , 
          });
        })
        .catch( (err) => {
          res.status(500).send({
            message: err.message || "Some error occured while retrieving tutorials",
          });
        });
};
/*
exports.findAll = (req, res) => {
  const title = req.query.title || "";
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong .",
      });
    });
};*/

//Find a single tutorial by its ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Tutorial.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "No tutorial" });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving tutorial" });
    });
};

//update a tutorial by its in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: " tutorial not found" });
      } else {
        res.send({ message: " tutorial successfully deleted" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({ message: " tutorials are successfully deleted" });
    })
    .catch((err) => {
      res.send(500).send({ message: err.message });
    });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {};
