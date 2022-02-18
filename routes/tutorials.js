const router = require('express').Router();
const tutorials = require('../controllers/tutorial.controller');
//create new tutorial
router.post("/",tutorials.create);

router.get("/", tutorials.findAll);

module.exports = router; 

