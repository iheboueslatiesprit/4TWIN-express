var  express = require("express");
var  router = express.Router();
var os = require('os');


var list = os.cpus();

router.get('/cpus/', (req, res) => {
    res.json(
        list
    )
});

router.get('/cpus/a', (req, res) => {
res.json(
    list[req.query.r] 
)
});


module.exports = router ;