# Projet Mini Blog

## Description

Réalisation d'un mini blog. Le blog est en 2 parties :

- Front : Un site qui utilise REACT.JS
- Back : Un Serveur en NODE.JS qui utilise les API REST
- Mobile : Si tout est ok réaliser l'APP mobile avec REACT NATIVE

## Plan du site

### Blog

La partie blog contien une liste d'articles classés par date d'ajout.
Un article peut être commenté par un membre activé

#### Liste des fonctionnalités

- lister les articles publiés par ordre de sortie
- afficher X articles par page
- Un systeme de pagination
- Afficher un article publié
- Commenter un article si l'utilisateur est inscrit et activé
- voir les commentaires

### User

La partie user sert à s'inscrire, à s'authentifier et supprimer son compte
les utilisateurs auront des permissions

- admin : peut tout gerer
- actifUser : peut ajouter des commentaires
- noActifuser : inscription non validée

### liste des fonctionnalités

- créer un utilisateur
- activer son compte
- se connecter
- supprimer son compte

## Admin

Une section admin qui permet d'ajouter, modifier, supprimer un article
una article pourra etre publié ou non.
L'admin peut voir la liste des utilisateurs, les supprimer, les activer

### liste des fonctionnalités

- lister les articles meme non publiés
- Ajouter un article
- Modifier un article
- Supprimer un article
- Voir les utilisateurs et status de roles
- supprimer un user
