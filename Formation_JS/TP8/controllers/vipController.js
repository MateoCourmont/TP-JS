const Vip = require("../models/vip");

const getVIPs = async (request, response) => {
  // Récupérer tous les VIPs dans mongo
  const vips = await Vip.find();

  console.log(vips);

  if (vips.length == 0) {
    // si liste vide, retourner code 701
    return response.json({
      code: "701",
      message: "La liste des VIP est vide",
      data: null,
    });
  }
  return response.json({
    code: "200",
    message: "La liste des VIP a été récupérée avec succès",
    data: vips,
  });
};

const getVIPById = async (request, response) => {
  const idParam = request.params.id;

  const foundVip = await Vip.findOne({ _id: idParam });

  if (!foundVip) {
    return response.json({
      code: "701",
      message: `Impossible de retourner un VIP avec l'id ${idParam}`,
      data: null,
    });
  }

  return response.json({
    code: "200",
    message: `VIP ${foundVip.prenom} ${foundVip.nom} récupéré avec succès`,
    data: foundVip,
  });
};

const addVIP = async (request, response) => {
  const vipJson = request.body;
  const existingVip = await Vip.findOne({ nom: vipJson.nom });

  if (!vipJson.nom || !vipJson.prenom) {
    return response.json({
      code: "705",
      message: "Un ou plusieurs champs sont manquants",
      data: null,
    });
  }

  if (typeof vipJson.nom != "string") {
    return response.json({
      code: "710",
      error: "Le champs nom doit être une châine de caractère",
    });
  }

  if (typeof vipJson.prenom != "string") {
    return response.json({
      code: "710",
      error: "Le champs prenom doit être une châine de caractère",
    });
  }

  if (existingVip) {
    return response.json({
      code: "701",
      message: "Impossible d'ajouter un VIP déjà existant",
      data: null,
    });
  }

  const newVip = new Vip(vipJson);

  await newVip.save();

  // Retourner un json
  return response.json({
    code: "200",
    message: "VIP ajouté avec succès",
    data: vipJson,
  });
};

const updateVIP = async (request, response) => {
  const vipJson = request.body;

  const idParam = request.params.id;

  // Contrôle de surface
  if (!vipJson.nom || !vipJson.prenom) {
    return response.json({
      code: "705",
      error: "Un ou pluisieurs champs sont manquants",
    });
  }

  if (typeof vipJson.nom != "string") {
    return response.json({
      code: "710",
      error: "Le champs nom doit être une châine de caractère",
    });
  }

  if (typeof vipJson.prenom != "string") {
    return response.json({
      code: "710",
      error: "Le champs prenom doit être une châine de caractère",
    });
  }

  const foundVip = await Vip.findOneAndUpdate({ _id: idParam }, vipJson, {
    new: true,
    runValidators: true,
  });

  if (!foundVip) {
    return response.json({
      code: "702",
      message:
        "Impossible de récupérer un VIP et le modifier avec l'ID inexistant: " +
        idParam,
      data: null,
    });
  }

  return response.json({
    code: "200",
    message: "VIP modifié avec succès",
    data: foundVip,
  });
};

const deleteVIP = async (request, response) => {
  const idParam = request.params.id;

  const foundVip = await Vip.findOneAndDelete({ _id: idParam });

  if (!foundVip) {
    return response.json({
      code: "702",
      message: "Impossible de supprimer un VIP avec un ID inexistant",
      data: null,
    });
  }

  return response.json({
    code: "200",
    message: "VIP supprimé avec succès",
    data: foundVip,
  });
};

module.exports = { getVIPs, getVIPById, addVIP, updateVIP, deleteVIP };
