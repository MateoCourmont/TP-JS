const express = require("express");
const router = express.Router();
const path = require("path");

// Route pour servir la page cocktail.html
router.get("/cocktail", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "cocktail.html"));
});

module.exports = router;
