const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const rutas = require("./rutas");

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", rutas);

app.get("/", (req, res) => {
    res.json({
        message: "API de Productos - CRUD",
        endpoints: {
            guardar: "POST /api/productos/Guardar",
            actualizar: "PUT /api/productos/Actualizar",
            eliminar: "DELETE /api/productos/Eliminar",
            listarId: "GET /api/productos/ListarId?_id=xxx",
            listarTodos: "GET /api/productos/ListarTodos"
        }
    });
});

module.exports = app;