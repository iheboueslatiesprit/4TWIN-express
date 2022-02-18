module.exports = application => {
const tutorials = require('../controllers/tutorial.controller');
var router = require("express").Router();
//create new tutorial
router.post("/",tutorials.create);

router.get("/", tutorials.findAll);

}