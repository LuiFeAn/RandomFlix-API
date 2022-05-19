const SeriesRepository = require("../repositories/SeriesRepository");

class SerieController{

    async index(req,res){

        const {email,password,perfil} = req.body

        if(email && password && perfil){

           const movies = await SeriesRepository.findOne(email,password,perfil);
           if(movies.img <= 0 || movies.link <= 0) 
           return res.status(400).json({error:"Nenhum filme/serie encontrado(s) !"});
           return res.json({movies});

        }

    }
}

module.exports = new SerieController();