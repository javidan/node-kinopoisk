This is a small library for getting movie information from kinopoisk.ru.

Example usage: 

``` javascript
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

```

module have 2 function

**.search(movie_name, callback):** searches for movie name and calls callback on success or error. callback will get json info if succeed.

**.movieInfo(id, callback):** gets movie info by id. information will be in json format.


Example:

```
{ russian_title: 'Терминатор 2: Судный день',
  original_title: 'Terminator 2: Judgment Day',
  year: '1991',
  country: 'США, Франция',
  director: 'Джеймс Кэмерон',
  writer: 'Джеймс Кэмерон, Уильям Уишер мл.',
  producer: 'Джеймс Кэмерон, Стефани Остин, Гэйл Энн Хёрд, ...',
  operator: 'Адам Гринберг',
  composer: 'Брэд Фидель',
  artist: 'Джозеф С. Немец III, Джозеф П. Лаки, Марлен Стюарт, ',
  installation: 'Конрад Бафф IV, Доди Дорн, Марк Голдблатт, ',
  genre: 'фантастика, боевик, триллер',
  budget: '$102 000 000',
  usa_box_office: '$204 843 345',
  worldwide_box_office: '+ $315 000 000 = $519 843 345',
  rating: '8.376',
  description: 'Прошло более десяти лет с тех пор, как киборг-терминатор из 2029 года пытался уничтожить Сару Коннор  женщину, чей будущий сын выиграет войну человечества против машин.Теперь у Сары родился сын Джон и время, когда он поведёт за собой выживших людей на борьбу с машинами, неумолимо приближается. Именно в этот момент из постапокалиптического будущего прибывает новый терминатор  практически неуязвимый и способный принимать любое обличье. Цель нового терминатора уже не Сара, а уничтожение молодого Джона Коннора.Однако шансы Джона на спасение существенно повышаются, когда на помощь приходит перепрограммированный сопротивлением терминатор предыдущего поколения. Оба киборга вступают в смертельный бой, от исхода которого зависит судьба человечества.' }
```