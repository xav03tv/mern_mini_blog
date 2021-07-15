/**
 * Controller : User
 */

//Création d'un utilsiateur
exports.users_create_user = (req, res) => {
  console.log("Todo : Création d'un utilisateur");
  res.status(200).json({
    message: "Todo : Création d'un utilsateur",
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
