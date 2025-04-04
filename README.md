# HackTrack

HackTrack est une application React conçue pour gérer et afficher des hackathons. Elle permet aux utilisateurs de voir les détails des hackathons à venir, en cours et passés, ainsi que de s'inscrire ou de rejoindre des équipes.

## Table des Matières

- [Installation](#installation)
- [Structure du Projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Dépendances](#dépendances)

## Installation

Pour installer et lancer le projet, suivez ces étapes :

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/hacktrack.git
   cd hacktrack
   ```

2. **Installer les dépendances :**

   ```bash
   npm install
   ```

3. **Lancer l'application :**

   ```bash
   npm run dev
   ```

   L'application sera accessible à l'adresse `http://localhost:5173` (ou un autre port si configuré différemment).

## Structure du Projet

- **`public/`** : Contient les fichiers statiques comme `vite.svg`.

- **`src/components/`** : Contient les composants React réutilisables.
  - `AuthContainer.jsx` : Conteneur pour l'authentification et le profile.
  - `Button.jsx` : Composant de bouton.
  - `Card.jsx` : Composant de carte pour afficher des informations structurées.
  - `Form.jsx` : Composant de formulaire.
  - `Loader.jsx` : Composant pour afficher un indicateur de chargement.
  - `Navbar.jsx` : Composant de barre de navigation.
  - `TeamCreationForm.jsx` : Formulaire pour créer une équipe.
  - `TeamJoinForm.jsx` : Formulaire pour rejoindre une équipe.

- **`src/context/`** : Contient les fichiers de gestion de contexte.
  - `AuthContext.jsx` : Contexte pour la gestion de l'authentification.

- **`src/pages/`** : Contient les pages principales de l'application.
  - `HackathonDetails.jsx` : Page pour afficher les détails d'un hackathon spécifique.
  - `Hackathons.jsx` : Page pour lister les hackathons.
  - `Home.jsx` : Page d'accueil.
  - `Login.jsx` : Page pour la connexion des utilisateurs.
  - `Profile.jsx` : Page pour afficher le profil de l'utilisateur.
  - `Register.jsx` : Page pour l'inscription des utilisateurs.

- **`src/App.css`** : Fichier CSS principal pour le style de l'application.
- **`src/App.jsx`** : Point d'entrée principal de l'application.
- **`src/index.css`** : Fichier CSS pour le style global.
- **`src/main.jsx`** : Point de rendu de l'application React.

## Fonctionnalités

- Affichage des hackathons à venir, en cours et passés.
- Détails des hackathons avec les équipes inscrites.
- Authentification des utilisateurs avec inscription et connexion.
- Création et participation à des équipes pour les hackathons.

## Dépendances

Voici les dépendances utilisées dans ce projet, ainsi que les commandes pour les installer :

- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
  ```bash
  npm install react
  ```

- **React Router** : Gestion des routes dans l'application.
  ```bash
  npm install react-router-dom
  ```

- **Axios** : Pour les requêtes HTTP.
  ```bash
  npm install axios
  ```

- **Bootstrap** : Pour le style et la mise en page.
  ```bash
  npm install bootstrap
  ```

- **Zod** : Pour la validation des formulaires.
  ```bash
  npm install zod
  ```

- **React Hook Form** : Pour gérer les formulaires dans React.
  ```bash
  npm install react-hook-form
  ```

- **Vite** : Outil de build frontend rapide.
  ```bash
  npm install vite
  ```
