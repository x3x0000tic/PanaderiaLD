const express = require("express");
const path = require("path");
const app = express();

// Sirve archivos estáticos desde la carpeta principal del proyecto
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});
