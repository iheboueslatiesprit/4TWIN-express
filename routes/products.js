const router = require('express').Router()
const fs = require('fs');

router.get('/' , (req , res)=>{
 fs.readFile('products.json', (err, data) => {
   res.send( JSON.parse(data) );
})
    // readFile = ta9ra fichier raw et asynchronous
    // JSON.parse tparsi raw l jason
    
})
 


router.get('/another-route' , (req , res)=>{
    // router code here
})

module.exports  = router