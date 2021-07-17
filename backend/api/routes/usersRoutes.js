const express = require("express");
const userController = require("../controllers/usersController");
const permissionChecker = require("../controllers/permissionChecker");

const router = express.Router();

//Routes pour la création d'un nouvel utilisateur
router.post("/", userController.users_create_user);

//Route pour l'activation d'un nouvel utilisateur

router.patch("/activate/:keyActivation", userController.users_activate_user);

/**
 * Route pour se connecter en tant qu'utilisateur
 */
router.post("/login", userController.users_login);

/**
 * Route pour supprimer un utilisateur
 */
router.delete(
  "/:idUser",
  permissionChecker("ADMIN_USER", "VALIDED_USER"),
  userController.users_delete_user
);

/**
 * Change le role d'un utilisateur
 */
router.patch("/change_permissison/", userController.users_change_permissison);

/**
 * Récupere tous les utilisateurs
 */

router.get("/get_all_users", userController.users_get_all_users);

module.exports = router;
