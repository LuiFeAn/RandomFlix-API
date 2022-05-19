const {Router} = require("express");
const SerieController = require("../app/controllers/SerieController");
const route = Router();

route.post("/movies",SerieController.index);

module.exports = route;