"use strict"

var request = require('request')
var cheerio = require('cheerio')
var Iconv  = require('iconv').Iconv;
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '').replace('\n','').replace('...','');};


var convert = function(body){
    var body = new Buffer(body, 'binary')
    var conv = new Iconv('windows-1251', 'utf8')
    var body = conv.convert(body).toString()

    return body;
}

module.exports =  {
    search: function(name, success){
        var url = 'http://www.kinopoisk.ru/index.php?first=no&what=&kp_query=' + encodeURIComponent(name);
        var success = success || function(){};


        request({url:url, encoding: 'binary'}, function(err, response,body) {
          
          body = convert(body);



          var $ = cheerio.load(body);

          var title = $('.most_wanted .name a').text()

          if(title && title !='' && !err){
              var url = $('.most_wanted .name a').attr('href')
              var id = /film\/(\d+)\/sr/.exec(url)[1]

              var result = {
                title: title,
                url: url,
                id: id
              }
              success.call(this, null, result);
          }else{
              success.call(this, 'nothing found for movie '+name);
          }
          
        });    
    },
    movieInfo: function(id, callback){
        var url = 'http://www.kinopoisk.ru/film/'+ id +'/'
        var callback = callback || function(){};

        request({url:url, 
            encoding: 'binary',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36',
                'Host':'www.kinopoisk.ru',
                'Referrer':'www.kinopoisk.ru',
                'Referer':'www.kinopoisk.ru'
            }}, function(err, response, body) {
            
            if(err) {
                callback.call(this, 'error on request to kinopoisk for id '+id);
                return
            }
            body = convert(body);
            var $ = cheerio.load(body);
            var title = $('.moviename-big').first().text()

            if(!title){
                callback.call(this, 'nothing found for id '+id);
                return
            }

            var result = {
                russian_title: title,
                original_title: $('span[itemprop=alternativeHeadline]').text().trim(),
                year: $('.info td:contains(год) ~ td').text().trim(),
                country: $('.info td:contains(страна) ~ td').text().trim(),
                director: $('.info td:contains(режиссер) ~ td').text().trim(),
                writer: $('.info td:contains(сценарий) ~ td').text().trim(),
                producer: $('.info td:contains(продюсер) ~ td').text().trim(),
                operator: $('.info td:contains(оператор) ~ td').text().trim(),
                composer: $('.info td:contains(композитор) ~ td').text().trim(),
                artist: $('.info td:contains(художник) ~ td').text().trim(),
                installation: $('.info td:contains(монтаж) ~ td').text().trim(),
                genre: $('.info td:contains(жанр) ~ td span[itemprop="genre"]').text().trim(),
                budget: $('.info td:contains(бюджет) ~ td').find('a').first().text().trim(),
                usa_box_office: $('.info td:contains(сборы в США) ~ td a').first().text().trim(),
                worldwide_box_office: $('.info td:contains(сборы в мире) ~ td a').first().text().trim(),
                rating: $('.rating_ball').text().trim(),
                description: $('.news .brand_words').text().trim()
            }

            callback.call(this, null, result);
        });    
    }
}