const  errorHandler = ( err , req , res , next ) => { 

     statusCode = res.statusCode ? res.statusCode : 500 
    

    res.json({ 
        message: "from error handler ${err.message} " , 
        stack: process.env.NODE_ENV == 'production' ? null : err.stack 
        
    })
}

module.exports = {
    errorHandler ,
}