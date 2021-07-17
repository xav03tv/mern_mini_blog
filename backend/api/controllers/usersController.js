/**
 * Controller : User
 * Structure : _id, email, pseudo, password, role, validate
 */
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const keygen = require("keygenerator");

const User = require("../models/usersSchema");

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
  User.find({
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
            //Creation d'une clé pour la validation
            const key = keygen._();
            //Enregistrement en BDD
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              pseudo: pseudo,
              password: hash,
              role: "NEW_USER",
              validateUser: false,
              validationKey: key,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(200).json({
                  message: "USER_SAVED",
                  activationLink: "http://localhost:3000/users/activate/" + key,
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

//Connexion d'un utilisateur
exports.users_login = (req, res) => {
  console.log("Todo : vérifie la connexion d'un utilisateur");
  res.status(200).json({
    message: "Todo : vérifie la connexion d'un utilisateur",
  });
};

//Activation d'un utilisateur
exports.users_activate_user = (req, res) => {
  //Recupere la clé d'activation
  const key = req.params.keyActivation;

  //verifie en BDD si il y a la clé
  User.findOne({ validationKey: key })
    .then((result) => {
      console.log(result);
      //Si oui on active le compte
      User.updateOne(
        {
          _id: result._id,
        },
        {
          validateUser: true,
        }
      )
        .then((resultUpdate) => {
          res.status(200).json({
            message: "USER_ACTIVATED",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({
            message: "Erreur serveur 2",
          });
        });
      //On renvoie les données
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Erreur server",
      });
    });
};

//Suppression d'un utilisateur
exports.users_delete_user = (req, res) => {
  console.log("Todo : Suppression d'un utilisateur");
  res.status(200).json({
    message: "Todo : Suppression d'un utilisateur",
  });
};

//Changer le role d'un utilisateur
exports.users_change_permissison = (req, res) => {
  console.log("TODO : Changer le role d'un utilisateur (Admin only)");
  res.status(200).json({
    message: "TODO : Changer le role d'un utilisateur (Admin only)",
  });
};

//Récupere tous les utilisateurs
exports.users_get_all_users = (req, res) => {
  console.log("TODO : Renvoie la liste de tous les utilisateurs");
  res.status(200).json({
    message: "TODO : Renvoie la liste de tous les utilisateurs",
  });
};
