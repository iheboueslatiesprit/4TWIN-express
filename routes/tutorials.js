//const router = require('express').Router();
const tutorials = require('../controllers/tutorial.controller');
//create new tutorial
module.exports = function(app) {
//app.post("/",tutorials.create);
//app.delete("/",tutorials.deleteAll)
app.route("/").post(tutorials.create).delete(tutorials.deleteAll);

app.get("/tutorials", tutorials.findAll);

//app.get("/:id", tutorials.findOne);
//app.put("/:id" , tutorials.update);
//app.delete("/:id" , tutorials.delete);
app.route("/:id").get(tutorials.findOne).put( tutorials.update).delete(tutorials.delete);
//module.exports = router; 

}