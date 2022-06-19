const SeriesRepository = require("../repositories/SeriesRepository");
const FilterMovies = require("../../helpers/FilterMovies");

class SerieController{

    async show(req,res){

        try{

            const {email,password,perfil} = req.body;
        
            if(email && password && perfil){

                const movies = await SeriesRepository.find(
                    email,
                    password,
                    perfil
                );

                const filtred = FilterMovies(
                    movies.img,
                    movies.link
                );

                if(movies.img <= 0 || movies.link <= 0) return res.status(400).json({
                    error:"Nenhum filme/serie encontrado(s) !"
                });

                return res.json({
                    movies:filtred
                });
            }

        }catch(err){

            console.log(err).status(400);

        }

    }
}

module.exports = new SerieController();