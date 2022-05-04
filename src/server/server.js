const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const axios = require('axios')
const cheerio = require('cheerio');

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '../../dist')));
    
    // app.get('/', (req, res) => {
    //     return res.status(200).sendFile(path.join(__dirname, '../../index.html'));
    // })
}

//app.get('/api', (req, res) => res.status(200).send('This is not the page you\'re looking for...'));

const website = 'https://starwars.fandom.com/wiki/Darth_Sidious';

try {
    axios(website).then((res) => {
      const data = res.data;
      const $ = cheerio.load(data);
  
      let content = [];
        //console.log($(this).find('.quote', data).first().text())
    //   $('.quote', data).each(function () {
    //       console.log($(this).)
    //     const quote = $(this).text();
    //     //const url = $(this).find('a').attr('href');
  
    //     content.push({
    //         quote
    //     });
  
    //     app.use('/', (req, res) => {
    //       res.json(content);
    //     });
    //   });
      console.log($('.quote').first().text())
      console.log($('.quote').first().next('p')[0].children[1].data)
    });
  } catch (error) {
    console.log(error, error.message);
  }

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})