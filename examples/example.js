var kinopoisk = require('../lib/kinopoisk')


kinopoisk.search("Terminator 2", function(searchErr, result){
    if(!searchErr){
        kinopoisk.movieInfo(result.id, function(movieErr, info){
            if(movieErr){
                console.log('-- movie info error --')
                console.log(movieErr)
            }else{
                console.log('-- result --')
                console.log(info)
            }
        });
    }else{
        console.log('-- search error --')
        console.log(searchErr)
    }
});