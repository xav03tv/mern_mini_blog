/**
 * Controller : User
 * Structure : _id, email, pseudo, password, role, validate
 */
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;

const UsersModel = require("../models/usersModel");

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

//Création d'un utilsiateur
exports.users_create_user = (req, res) => {
  //récupération des données depuis la requete
  const { email, pseudo, password } = req.body;
  //Validation de l'adresse email
  if (!validateEmail(email)) {
    res.status(409).json({
      message: "INVALID_EMAIL_FORMAT",
    });
  }
  //On verifie si l'email n'existe pas
  UsersModel.find({
    email: email,
  })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        res.status(406).json({
          message: "EMAIL_ALREADY_EXIST",
        });
      } else {
        //Cryptage du MDP
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            //Enregistrement en BDD
            const user = new UsersModel({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              pseudo: pseudo,
              password: hash,
              role: "NEW_USER",
              validateUser: false,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  message: "USER_SAVED",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  message: "USER_NOT_SAVED",
                  error: err,
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "ERROR_SERVER",
      });
    });
};

//Activation d'un utilisateur
exports.users_activate_user = (req, res) => {
  console.log("Todo : Activation d'un utilisateur enregistré");
  res.status(200).json({
    message: "Todo : Activation d'un utilisateur enregistré",
  });
};

//Connexion d'un utilisateur
exports.users_login = (req, res) => {
  console.log("Todo : vérifie la connexion d'un utilisateur");
  res.status(200).json({
    message: "Todo : vérifie la connexion d'un utilisateur",
  });
};

//Suppression d'un utilisateur
exports.users_delete_user = (req, res) => {
  console.log("Todo : Suppression d'un utilisateur");
  res.status(200).json({
    message: "Todo : Suppression d'un utilisateur",
  });
};
