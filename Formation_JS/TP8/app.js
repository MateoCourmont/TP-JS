// Importer les modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const path = require("path");
const vipsRoutes = require("./routes/vipsRoutes");

dotenv.config();

// Instancier le server grace à express
const app = express();

// Autoriser le back à recevoir des données dans le body
app.use(express.json());

// Routes
app.use("/api", vipsRoutes);

// Quand je suis connecté à la bdd (evenementiel)
mongoose.connection.once("open", () => {
  console.log("Connexion à la base de données effectuée");
});

// Quand la bdd aura des erreurs
mongoose.connection.on("error", () => {
  console.log("Erreur dans la BDD");
});

// Se connecter sur mongodb (async)
// Ca prend x temps à s'executer
mongoose.connect(process.env.MONGODB_URL);

// Lancer le serveur
app.listen(process.env.PORT, () => {
  console.log("Le serveur a démarré");
});
