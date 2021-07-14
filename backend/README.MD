# Description Back end

##

## Liste des modules, de fonctionnalités et de leur end point + permission
## + structure des données


### Articles
 - lister les articles publié => Tout le monde => [GET] /articles
 - lister tous les articles même non publié => admin => [Get] /articles
 - afficher un article non publié => admin => [GET] /articles/:idArticle
 - afficher un article publié => tout le monde => [Get] /articles/:idArticle
 - Modifier un article => admin => [PATCh] /articles/:idArticle
 - Supprimer un article => admin [DELETE] /articles/:idArticle

#### structure
 - _id
 - title
 - content
 - description
 - dateCreation
 - published
 - image



