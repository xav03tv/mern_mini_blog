# Description Back end

## Instalation

créér un fichier .env dans le back end contenant :
BDD_NAME = nom de la base de donnée
BDD_USER = utilisateur de la bdd
BDD_PASS = code de la base de donnée

## Liste des modules, de fonctionnalités et de leurs end points + permissions

## + structure des données

### Articles

- lister les articles publiés => Tout le monde => [GET] /articles
- lister tous les articles même non publié => admin => [Get] /articles
- afficher un article non publié => admin => [GET] /articles/:idArticle
- afficher un article publié => tout le monde => [Get] /articles/:idArticle
- Creer un nouvel article => admin => [POST] /articles/
- Modifier un article => admin => [PATCh] /articles/:idArticle
- Supprimer un article => admin [DELETE] /articles/:idArticle

#### structure

- \_id
- title
- content
- description
- dateCreation
- published
- imageUrl

### Users

- créer un utilisateur => tout le monde => [POST] /user
- active un compte => tout le monde => [PATCH] /user/activate
- se connecter => tout le monde => [POST] /user/login
- supprimer un compe => son utilisateur => [DELETE] /user/:idUser
- changer le role d'un user => admin => [PATCH] /user/change_role
- Afficher tous les utilisateurs pour l'admin => [GET] /user/get_all_user

#### structure

- \_id
- email
- pseudo
- password
- role
- validate
