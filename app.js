var express = require('express');
var  cors = require('cors');
const dbConfig = require("./config/db.config");
var app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
const { errorHandler } = require('./middleware/errorHandler') ; 

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler) ; 
const db = require("./models")
const Role = require('./models/role.model');

//bezkoder
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  require('./routes/auth.routes')(app);
  require('./routes/user.routes')(app);
  require('./routes/tutorials')(app);

const port = process.env.PORT || 5000;

app.listen(port , () => `Server running on port ${port} `);

//bezkoder nodejsmongodbauthjwt
function initial() {
  
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error ", err);
        }
        console.log(" added user role successfully");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added admin role successfully");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error ", err);
        }
        console.log(" moderator role added successfuly");
      });
    }
  });
}

module.exports = app;
