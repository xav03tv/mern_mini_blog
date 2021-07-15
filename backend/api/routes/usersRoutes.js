const express = require("express");
const userController = require("../controllers/usersController");

const router = express.Router();

//Routes pour la création d'un nouvel utilisateur
router.post("/", userController.users_create_user);

//Route pour l'activation d'un nouvel utilisateur

router.patch("/activate", userController.users_activate_user);

/**
 * Route pour se connecter en tant qu'utilisateur
 */
router.post("/login", userController.users_login);

/**
 * Route pour supprimer un utilisateur
 */
router.delete("/:idUser", userController.users_delete_user);

module.exports = router;
