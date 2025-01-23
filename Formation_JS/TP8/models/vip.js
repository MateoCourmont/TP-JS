const mongoose = require("mongoose");

// Définir le schéma pour les films
const vipSchema = new mongoose.Schema({
  prenom: { type: String },
  nom: { type: String },
  status: { type: Boolean, default: false },
});

// Créer le modèle basé sur le schéma
const Vip = mongoose.model("Vip", vipSchema, "vips_collection");

module.exports = Vip;
