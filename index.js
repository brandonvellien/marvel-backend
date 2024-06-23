require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Importer les routeurs
const comicsRouter = require("./Routes/comics");
const charactersRouter = require("./Routes/characters");

// Utilisation des routeurs pour les routes /comics et /characters
app.use(comicsRouter);
app.use(charactersRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "all routes" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started `);
});
