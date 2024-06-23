const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = process.env.MARVEL_API_KEY;

// Route pour obtenir tous les comics ou rechercher par titre
router.get("/comics", async (req, res) => {
  const title = req.query.title || "";
  const limit = req.query.limit || 100;
  const skip = req.query.skip || 0;

  const apiUrl = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&title=${title}&limit=${limit}&skip=${skip}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

// Route pour obtenir les comics d'un personnage spécifique par characterId
router.get("/comics/:characterId", async (req, res) => {
  const { characterId } = req.params;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
