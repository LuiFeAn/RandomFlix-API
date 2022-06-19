function FilterMovies(image,link){

    let filter = [];

    for(let i = 0; i < 48; i++){

        const currentImg = image[i];
        const currentLink = link[i];

        filter.push({
            image:currentImg,
            link:currentLink,
        });

    }

    return filter
 
}

module.exports = FilterMovies