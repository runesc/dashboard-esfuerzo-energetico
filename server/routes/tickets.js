import express from "express"; // importar router de express
const router = express.Router(); // crear una instancia de router (el router es una lista de rutas que se pueden usar en la app)

import { testJira } from "../controllers/tickets.js"; // importamos una funcion que se encarga de hacer una tarea.
router.get("/test", testJira); // crea una nueva ruta que responde a una petición GET en la ruta /test y llama a la función testJira del controlador tickets.js

export default router; // exportamos la lista de rutas actualizada