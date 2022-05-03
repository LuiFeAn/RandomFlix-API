const {Router} = require("express");
const SerieController = require("../controllers/SerieController");
const route = Router();

route.post("/movies",SerieController.index);

module.exports = route;