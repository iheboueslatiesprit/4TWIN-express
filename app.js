var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
//bezkoder
var  cors = require('cors');
var corsOptions = {
  origin: "http://localhost:8081"
};
const db = require("./models");
//bezkoder : listen for requests
//const PORT = process.env.PORT || 8080 ;




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var osRouter = require('./routes/os');
var productsRouter = require('./routes/products');
var tutorialsRouter = require('./routes/tutorials');
//bezkoder : simple route jj
app.get('/' , (req , res)=>{
  res.json({message: "welcome to my personal app"});
});




app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
//bezkoder : changed to true
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os',osRouter);
app.use('/products',productsRouter);
app.use('/tutorials', tutorialsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} `);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error' , { title: err.message});
});
 
//bezkoder
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    console.log("Port  "+process . env.PORT);
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


module.exports = app;
