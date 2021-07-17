/**
 * Controller : User
 * Structure : _id, email, pseudo, password, role, validate
 */
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const keygen = require("keygenerator");
const jwt = require("jsonwebtoken");

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
      ok: false,
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
          ok: false,
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
                  ok: true,
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
exports.users_login = async (req, res) => {
  const { pseudo, password } = req.body;
  //récupération des données de l'user pour vérifier le MDP
  try {
    const user = await User.findOne({ pseudo: pseudo });
    //Verifier le MDP
    const matchPSW = await bcrypt.compare(password, user.password);
    //Si le MDP n'est pas valide
    if (!matchPSW) {
      return res.status(400).send({
        ok: false,
        message: "Combinaison Mail/Mot de passe incorrect",
      });
    }
    //Verification de l'activation de l'utilisateur
    if (!user.validateUser) {
      return res.status(400).send({
        ok: false,
        message: "Le compte n'est pas activé",
      });
      //Login vérifié, on renvoie les données
    }
    const token = jwt.sign(
      {
        user: {
          pseudo: user.pseudo,
          email: user.email,
          userId: user._id,
        },
      },
      "123456",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).send({
      ok: true,
      message: "login validé",
      token: token,
    });
  } catch (err) {
    //Envoie d'une erreur car l'user n'est pas valide
    console.log(err);
    res.status(400).send({
      ok: false,
      message: "Combinaison Mail/Mot de passe incorrect",
    });
  }
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
          role: "VALIDED_USER",
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
exports.users_delete_user = async (req, res) => {
  const id = req.params.idUser;
  //Check si on a le droit de supprimer
  console.log(req.userData);
  //on recupere  l'utilisateur
  const user = await User.findOne({ _id: req.userData.user.userId });
  //Verifie si on a un utilisateur
  console.log(user);
  //On verifie si je suis le proprio de compte ou ADMIN
  if (
    user &&
    (req.userData.user.email === user.email || user.role === "ADMIN")
  ) {
    //Si oui, on supprime
    try {
      const response = await User.deleteOne({ _id: id });
      return res.status(200).json({
        ok: true,
        message: "L'utilisateur est supprimé",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        ok: false,
        message: "L'utilisateur ne peut etre supprimé",
      });
    }
  } else {
    res.status(400).json({
      ok: false,
      message: "DELETE_USER_UNAUTHORISED",
    });
  }
  //On supprime l'utilisateur
};

//Changer le role d'un utilisateur
exports.users_change_permissison = (req, res) => {
  console.log("TODO : Changer le role d'un utilisateur (Admin only)");
  res.status(200).json({
    message: "TODO : Changer le role d'un utilisateur (Admin only)",
  });
};

//Récupere tous les utilisateurs
exports.users_get_all_users = async (req, res) => {
  const users = await User.find();
  const usersFormated = users.map((user) => ({
    _id: user._id,
    pseudo: user.pseudo,
    email: user.email,
    role: user.role,
    validateUser: user.validateUser,
    validation_link:
      "http://localhost:3000/users/activate/" + user.validationKey,
    delete_user: {
      method: "DELETE",
      link_delete_user: "http://localhost:3000/users/" + user._id,
    },
  }));
  res.status(200).json({
    ok: true,
    usersQty: usersFormated.length,
    users: usersFormated,
  });
};
