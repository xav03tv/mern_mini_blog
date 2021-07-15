const express = require("express");

const router = express.Router();

/**
 * Routes pour la création d'un nouvel utilisateur
 */
router.post("/", (req, res) => {
  console.log("Todo : Création d'un utilisateur");
  res.status(200).json({
    message: "Todo : Création d'un utilsateur",
  });
});

/**
 * Route pour l'activation d'un nouvel utilisateur
 */
router.patch("/activate", (req, res) => {
  console.log("Todo : Activation d'un utilisateur enregistré");
  res.status(200).json({
    message: "Todo : Activation d'un utilisateur enregistré",
  });
});

/**
 * Route pour se connecter en tant qu'utilisateur
 */
router.post("/login", (req, res) => {
  console.log("Todo : vérifie la connexion d'un utilisateur");
  res.status(200).json({
    message: "Todo : vérifie la connexion d'un utilisateur",
  });
});

/**
 * Route pour supprimer un utilisateur
 */
router.delete("/:idUser", (req, res) => {
  console.log("Todo : Suppression d'un utilisateur");
  res.status(200).json({
    message: "Todo : Suppression d'un utilisateur",
  });
});

module.exports = router;
