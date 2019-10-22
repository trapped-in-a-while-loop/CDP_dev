# CDP_dev

Rôles:

Le PROPRIETAIRE d'un projet P est defini comme l'utilisateur étant connecté à un compte sur l'outil et ayant créé le projet P. Il est le seul utilisateur à pouvoir :
 - supprimer le projet P,
 - modifier les informations descriptives du projet P,
 - ajouter un membre au projet P,
 - attribuer des droits à un membre du projet P,
 - retirer des droits à un membre du projet P,
 - modifier les droits d'un membre du projet P.

Le CLIENT est defini comme l'utilisateur étant connecté à un compte sur l'outil, étant membre du projet P sans l'avoir créé et ayant seulement des droits de lecture sur les ISSUES, les TASKS, les TESTS et la DOC. Le client peut télécharger la dernière RELEASE.

Le DEVELOPPEUR est defini comme l'utilisateur étant connecté à un compte sur l'outil, étant membre du projet P sans l'avoir créé et ayant les mêmes droits que le CLIENT, ainsi que les suivants:
 - ajouter, supprimer et modifier les ISSUES, les TASKS, les RELEASES, les TESTS et la DOC.

Le VISITEUR est defini comme l'utilisateur qui n'est pas connecté à un compte sur l'outil, ou qui est connecté à un compte sur l'outil sans être membre du projet P. Il peut se créer un compte, se connecter à un compte de l'outil, effectuer une recherche parmi les projets présents sur l'outil et visualiser la page d'accueil d'un projet selectionné. Les User Stories qui concernent le VISITEUR concernent donc également les autres usagers : les droits du VISITEUR sont des droits par défaut, que tous les rôles ont.

(CLIENT : il peut agir sur les priorités des issues.)

************************************************************************************************************************************

VISITEUR

US1 : En tant que VISITEUR
      je souhaite pouvoir créer un compte. Sur la page d'accueil de l'outil, on aurait accès au bouton S'INSCRIRE. En appuyant dessus, l'outil ouvrirait une nouvelle fenêtre qui proposerait un formulaire à remplir avec les informations nécessaires à l'authentification (NOM, PRÉNOM, LOGIN, ADRESSE MAIL et MOT DE PASSE). Tous ces champs sont obligatoires. Il y aurait des champs facultatifs comme le nom de la société pour laquelle je travaille.
      Afin de pouvoir utiliser l'outil, je souhaite que cette fonctionnalité soit mise à ma disposition.

US2 : En tant que VISITEUR
       je souhaite visualiser la liste des différents projets présents sur l'outil. Sur la page d'accueil de l'outil, une barre de recherche serait disponible. En tapant certains mots clés et en appuyant sur la touche "ENTER" de mon clavier, l'outil me proposerait une liste des 10 projets triés par pertinence selon le titre et la description des projets.
       Afin d'avoir un aperçu des différents projets présents sur l'outil, je souhaite que cette fonctionnalité soit mise à ma disposition.

US3 : En tant que VISITEUR
        je souhaite visualiser la page d'accueil d'un projet en particulier. En sélectionnant un projet parmi ceux proposés par la page d'accueil de l'outil, je serai reconduit vers une nouvelle page contenant le titre et la description du projet selectionné.
        Afin d'avoir un résumé d'un projet, je souhaite que cette fonctionnalité soit mise à ma disposition.

US4 : En tant que VISITEUR
        je souhaite avoir une fenêtre pop-up qui s'affiche lorsque je cherche à accéder aux ISSUES, TASKS, TESTS, RELEASES ou DOC d'un projet auquel je ne suis pas membre. Cette fenêtre pop-up afficherait un message m'informant que je ne peux pas accéder à cette fonctionnalité.
        Afin de savoir quels sont les privilèges qui me sont accordés sur l'outil, je souhaite que cette fonctionnalité soit mise à ma disposition.

US5 : En tant que VISITEUR connecté à un compte,
        je souhaite que mes projets aient un accès protégé. En tant que VISITEUR non connecté à un compte, l'outil proposerait la rubrique S'AUTHENTIFIER qui mènerait à une nouvelle page. Celle ci comporterait les champs suivants à remplir: LOGIN et MOT DE PASSE. Lorsque ceux ci sont remplis, je peux appuyer sur le bouton VALIDER qui me donne accès à mes projets si les champs remplis sont corrects. Si ce n'est pas le cas, un message apparait et me demande de ressaisir mes identifiants.
        Afin de réaliser une gestion sécurisée de mes projets, je souhaite que cette fonctionnalité soit réalisée.

US6 : En tant que VISITEUR connecté à un compte,
        je souhaite pouvoir créer un projet. Sur n'importe quel page de l'outil, il y aurait un menu déroulant dans le coin supérieur droit comportant l'option "MES PROJETS". Cette option me redirigerait vers une page listant tous les projets dont je suis propriétaire et membre. Depuis cette page, il y aurait un bouton "CREER UN PROJET" qui me redirigerait vers une nouvelle page contenant un formulaire de création d'un projet, avec les champs "Titre" et "Description". La page comporterait un bouton "Valider" qui lorsque j'appuie dessus, enregistre le projet, et je suis alors propriétaire de ce projet.
        Afin de pouvoir créer et gérer mes projets, je souhaite que cette fonctionnalité soit réalisée.

US7 : En tant que VISITEUR connecté à un compte,
        je souhaite pouvoir gérer les informations de mon compte. Sur n'importe quel page de l'outil, il y aurait un menu déroulant dans le coin supérieur droit comportant l'option "MON COMPTE". Cette option me redirigerait vers une page affichant des champs de texte éditables contenant les informations de mon compte. En bas de la page, des boutons "Sauvegarder" et "Retour" sont affichés. L'appui sur le bouton "Sauvegarder" met à jour les modifications réalisées, l'appui sur le bouton "Retour" ne prend en compte aucune modification et me redirige vers la page de mes projets.
        Afin de pouvoir assurer la gestion de mon compte, je souhaite que cette fonctionnalité soit réalisée.

************************************************************************************************************************************

PROPRIETAIRE

US8 : En tant que PROPRIETAIRE
      je souhaite pouvoir supprimer un projet que j'ai créé. Dans la liste de mes projets, les projets dont je suis propriétaire auraient à proximité un bouton "Supprimer" permettant leur suppression. En appuyant dessus, une pop-up de confirmation avec deux boutons ("Confirmer" et "Annuler") s'ouvre, si je clique sur le bouton "Confirmer" le projet est supprimé de l'outil. Sinon, je suis redirigé sur la page affichant la liste de mes projets.
      Afin de gérer l'annulation d'un projet, je souhaite que cette fonctionnalité soit réalisée.

US9 : En tant que PROPRIETAIRE
      je souhaite pouvoir gérer un projet que j'ai créé. Dans la liste de mes projets, les projets dont je suis propriétaire auraient à proximité un bouton "Editer" permettant leur modification. En appuyant dessus, je suis redirigé vers la page de gestion du projet. Depuis cette page, des champs éditables contenant le titre et la description du projet sélectionné sont affichés. En bas de la page, des boutons "Sauvegarder" et "Retour" sont affichés. L'appui sur le bouton "Sauvegarder" met à jour les modifications réalisées, l'appui sur le bouton "Retour" ne prend en compte aucune modification et me redirige vers la page de mes projets.
      Afin de gérer l'évolution d'un projet, je souhaite que cette fonctionnalité soit réalisée.

US10 : En tant que PROPRIETAIRE
      je souhaite pouvoir gérer les membres qui participent à un projet que j'ai créé. Dans la liste de mes projets, les projets dont je suis propriétaire auraient à proximité un bouton "Gérer" permettant leur gestion. En appuyant dessus, je suis redirigé vers la page de gestion des membres du projet. Cette page contient deux groupes : "Clients" et "Développeurs". Chaque groupe est associé à une barre de recherche : les utilisateurs sont recherchés par leur login en fonction de mot-clés, et le résultat de la recherche est affiché sous la forme d'une liste. A partir de cette liste, je peux alors choisir quel(s) utilisateur(s) ajouter au groupe associé sur le projet dont je suis propriétaire. En bas de la page, des boutons "Sauvegarder" et "Retour" sont affichés. L'appui sur le bouton "Sauvegarder" met à jour les modifications réalisées, l'appui sur le bouton "Retour" ne prend en compte aucune modification et me redirige vers la page de mes projets.
      Afin de gérer l'organisation d'un projet, je souhaite que cette fonctionnalité soit réalisée.

US3 : En tant que DÉVELOPPEUR
      je souhaite créer une issue. Après mon authentification, le logiciel proposerait un menu sur le côté gauche avec les ISSUES, les TÂCHES, les RELEASES, les TESTS et la DOCUMENTATION. Lorsque je clique sur ISSUES, il y a la liste des issues et un bouton AJOUTER en haut. En cliquant sur celui-ci, une fenêtre pop-up s'ouvrirait qui afficherait les champs suivant à remplir : EN TANT QUE, JE SOUHAITE et AFIN DE. Tant que tous ces champs ne sont pas remplis, le bouton "VALIDER" de cette fenêtre serait grisé. Une fois la validation possible, l'issue est ajoutée à la liste des issues.
      afin d'ajouter des issues à ma liste d'issue.

US4 : En tant que DÉVELOPPEUR
      je souhaite modifier une issue. Après mon authentification, le logiciel proposerait un menu sur le côté gauche avec les ISSUES, les TÂCHES, les RELEASES, les TESTS et la DOCUMENTATION. Lorsque je clique sur les ISSUES, il y a la liste des issues et un bouton MODIFIER pour chaque issue. En cliquant sur celui-ci, le site ouvrirait une fenêtre pop-up avec tous les champs (EN TANT QUE, JE SOUHAITE et AFIN DE) éditables.  
      afin de corriger des erreurs.

US5 : En tant que DÉVELOPPEUR
      je souhaite avoir accès à mes issues
      afin de pouvoir les supprimer.

US6 : En tant que CLIENT
      je souhaite avoir accès aux issues
      afin de pouvoir les prioriser.

US7 : En tant que DÉVELOPPEUR
      je souhaite créer une tâche. Après mon authentification, le logiciel proposerait un menu sur le côté gauche avec les ISSUES, les TÂCHES, les RELEASES, les TESTS et la DOCUMENTATION. Lorsque je clique sur les TÂCHES, il y a une liste des tâches et un bouton AJOUTER en haut. En cliquant sur celui-ci, le logiciel ouvrirait une fenêtre pop-up avec un seul champ TÂCHE. Tant que ce champ n'est pas rempli, le bouton VALIDER sera grisé. Une fois la validation possible, la tâche sera ajoutée à la liste de tâche
      afin d'ajouter des tâches à ma liste de tâches.

US8 : En tant que DÉVELOPPEUR
      je souhaite avoir accès à mes tâches
      afin de pouvoir les modifier.

US9 : En tant que DÉVELOPPEUR
      je souhaite avoir accès à mes tâches
      afin de pouvoir les supprimer.

US10 : En tant que DÉVELOPPEUR
       je souhaite avoir accès à mes tâches
       afin de pouvoir les prioriser.

US11 : En tant que DÉVELOPPEUR
       je souhaite avoir accès à mes releases
       afin de pouvoir comparer différentes releases.

US12 : En tant que DÉVELOPPEUR
       je souhaite créer un test. Après mon authentification, le logiciel proposerait un menu sur le côté gauche avec les ISSUES, les TÂCHES, les RELEASES, les TESTS et la DOCUMENTATION. Lorsque je clique sur les TESTS, il y a une liste de tests et un bouton AJOUTER en haut. En cliquant sur celui-ci, le logiciel ouvrirait une fenêtre pop-up qui afficherait les champs suivants : GIVEN, WHEN et THEN. Il y aurait des petits boutons "+" après les champs GIVEN et THEN pour ajouter des champs AND. Tant que tous les champs ne sont pas remplis, le bouton VALIDER sera grisé. Une fois la validation possible, le test sera ajouté à la liste de tests.
       afin d'ajouter des tests.

US13 : En tant que DÉVELOPPEUR
       je souhaite avoir accès à mes tests
       afin de pouvoir les modifier.

US14 : En tant que DÉVELOPPEUR
       je souhaite avoir accès à mes tests
       afin de pouvoir les supprimer.

US15 : En tant que DÉVELOPPEUR
       je souhaite créer une documentation. Après mon authentification, le logiciel proposerait un menu sur le côté gauche avec les ISSUES, les TÂCHES, les RELEASES, les TESTS et la DOCUMENTATION. Lorsque je clique sur la DOCUMENTATION, il y a une liste de documentation et un bouton AJOUTER en haut.

       afin de pouvoir en créer.

US16 : En tant que DÉVELOPPEUR
       je souhaite avoir accès à ma documentation
       afin de pouvoir les modifier.
