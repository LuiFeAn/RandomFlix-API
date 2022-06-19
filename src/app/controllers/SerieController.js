const SeriesRepository = require("../repositories/SeriesRepository");

class SerieController{

    async show(req,res){

        const {email,password,perfil} = req.body;
        
        if(email && password && perfil){

           try{

            const movies = await SeriesRepository.find(
                email,
                password,
                perfil
            );
            
            if(movies.img <= 0 || movies.link <= 0) return res.status(400).json({
                error:"Nenhum filme/serie encontrado(s) !"
            });

            return res.json({
                movies
            });

           }catch(err){


           }

        }

    }
}

module.exports = new SerieController();