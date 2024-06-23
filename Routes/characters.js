const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.MARVEL_API_KEY;

// Route pour obtenir la liste des personnages
router.get("/characters", async (req, res) => {
  const name = req.query.name || "";
  const limit = req.query.limit || 100;
  const skip = req.query.skip || 0;

  let apiUrl = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&name=${name}&limit=${limit}&skip=${skip}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Marvel API:", error);
    res.status(500).json({
      error: "An error occurred while fetching data from the Marvel API",
    });
  }
});

// Nouvelle route pour obtenir les informations d'un personnage spécifique
router.get("/character/:characterId", async (req, res) => {
  const { characterId } = req.params;

  const apiUrl = `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Marvel API:", error);
    res.status(500).json({
      error: "An error occurred while fetching data from the Marvel API",
    });
  }
});

module.exports = router;
