const express = require("express");
const router = express.Router();
const vipController = require("../controllers/vipController");

// Routes pour les vips
router.get("/vips", vipController.getVIPs);
router.get("/vip/:id", vipController.getVIPById);
router.post("/add-vip", vipController.addVIP);
router.put("/vip/:id/status", vipController.updateStatus);
router.put("/vip/:id", vipController.updateVIP);
router.delete("/vip/:id", vipController.deleteVIP);

module.exports = router;
