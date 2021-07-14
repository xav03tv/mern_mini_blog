# Description Back end

##

## Liste des modules, de fonctionnalités et de leur end point + permission
## + structure des données


### Articles
 - lister les articles publié => Tout le monde => [GET] /articles
 - lister tous les articles même non publié => admin => [Get] /articles
 - afficher un article non publié => admin => [GET] /articles/:idArticle
 - afficher un article publié => tout le monde => [Get] /articles/:idArticle
 - Creer un nouvel article => admin => [POST] /articles/
 - Modifier un article => admin => [PATCh] /articles/:idArticle
 - Supprimer un article => admin [DELETE] /articles/:idArticle

#### structure
 - _id
 - title
 - content
 - description
 - dateCreation
 - published
 - imageUrl

 ### Users
 - créer un utilisateur => tout le monde => [POST] /user
 - active un compte => tout le monde => [PATCH] /user/activate/:token
 - se connecter => tout le monde => [POST] /user/login
 - supprimer un compe => son utilisateur => [DELETE] /user/:idUser
 - changer le role d'un user => admin => [PATCH] /user/change_role

 #### structure

 - _id
 - mail
 - pseudo
 - password
 - role
 - validate



