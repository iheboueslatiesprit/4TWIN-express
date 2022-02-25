//const router = require('express').Router();
const tutorials = require('../controllers/tutorial.controller');
//create new tutorial
module.exports = function(app) {
app.post("/",tutorials.create);

app.get("/tutorials", tutorials.findAll);

app.get("/:id", tutorials.findOne);

app.put("/:id" , tutorials.update);

app.delete("/:id" , tutorials.delete);

app.delete("/",tutorials.deleteAll)

//module.exports = router; 

}