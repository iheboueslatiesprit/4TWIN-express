const config = require("../config/db.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const RefreshToken = db.resfreshToken ; 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");



exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin =   (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec( async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      let  passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!"
        });
      }
      let  token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration 
      });
      let refreshToken =  await  RefreshToken.createToken(user);
      console.log("refreshToken");
      console.log(refreshToken);
     var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      } 
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        refreshToken:  refreshToken ,
      });
    });
};

exports.refreshToken = async ( req , res  ) => {
  const {refreshToken : requestToken} = req.body ; 
  if ( requestToken == null ) {
    return res.status(403).json({ message : "refresh token is reuiqred"});
  }
  try { 
    let refreshToken = await RefreshToken.findOne({ token: requestToken}) ;
    if (!refreshToken) { 
      res.status(403).json({ message : "refresh token is not found"});
      return ;
    }
    if (RefreshToken.verifyExpiration (refreshToken)){ 
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      console.log(" el token"+refreshToken +" supprimé ");
      res.status(403).json({ 
        message: " Refresh token was expired please sign in again" 
      }) ; 
      return ; 
    }
    let newAccessToken = jwt.sign({ id : refreshToken.user._id } , config.secret , { expiresIn : config.jwtExpiration  });
    console.log(" el token jdid ${newAccessToken}" );
    return res.status(200).json( { 
      accessToken : newAccessToken , 
      refreshToken: refreshToken.token , 
    }) ; 
  } catch (err) {
    return res.status(500).send({ message :err.message }) ; 
  }
}