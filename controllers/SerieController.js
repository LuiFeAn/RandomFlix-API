const SeriesRepository = require("../repositories/SeriesRepository");

class SerieController{

    async index(req,res){
        const {email,password,perfil} = req.body

        const movie = await SeriesRepository.findOne(email,password,perfil);

        return res.json(movie);
    }

}

module.exports = new SerieController();