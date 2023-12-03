const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // pour analyser le corps des requêtes JSON

app.get("/", (req, res) => {
  res.send("TODO_APP_SOGETI_backend by Mathieu FOURTANE");
});

app.use("/api/todos", todoRoutes); // utiliser les routes définies dans todoRoutes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
