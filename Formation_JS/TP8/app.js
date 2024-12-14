// Importer les modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const vipsRoutes = require("./routes/vipsRoutes");
const viewsRoutes = require("./routes/viewsRoutes");

dotenv.config();

// Instancier le server grace à express
const app = express();

// Autoriser le back à recevoir des données dans le body
app.use(express.json());

app.use(cors());

// Routes
app.use("/api", vipsRoutes);
app.use("/", viewsRoutes);

//app.use("/pages", viewsRoutes);

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
