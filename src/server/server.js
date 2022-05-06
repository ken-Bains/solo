const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const axios = require('axios')
const cheerio = require('cheerio');
const db = require('./models/priceModel.js');

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '../../dist')));
    
    // app.get('/', (req, res) => {
    //     return res.status(200).sendFile(path.join(__dirname, '../../index.html'));
    // })
}

//app.get('/api', (req, res) => res.status(200).send('This is not the page you\'re looking for...'));
app.use('/api/urls', (req, res) => {
    console.log("+++++++++++")
    db.query('select * from Urls where User_id = 1').then(data => {
        console.log(data.rows)
        res.status(200).json(data.rows);
    })
})
app.post('/api/new', (req,res) => {
    const r = req.body;
    if(req.body.name === '') return 
    const insert = 'INSERT INTO Urls (name, img, price, url, User_id ) VALUES ($1, $2, $3, $4, $5)';
    const values = [r.name, r.img, r.price, r.url, '1']
    db.query(insert, values).then(data => {
        res.sendStatus(200)
    }).catch(err => console.log(err))
})

app.get('/check', (req,res) => {
    let urls; 
    db.query('select * from Urls where User_id = 1').then(data => {
        urls = data.rows
        return urls
    }).then(urls => {
        const website = urls.url;
        
        try {
            axios(website).then((res) => {
              const data = res.data;
              const $ = cheerio.load(data);
                
              
              $('span', data).each(function () {
                  //console.log($(this).text().trim() === '$2,746.89' , $(this).text().trim())
                  if($(this).text().trim() === '$2,746.89') console.log(true, "sasasassasaas")
    
              });
            }); 
          } catch (error) {
            console.log(error, error.message);
          }
        
    })
})

app.get('/game', (req,res) => {
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
          console.log($('.quote').first().next('p')[0].children[0].children[0].data)
          console.log($('.quote').first().next('p')[0].children[0].children[0].parent.name)
          console.log($('.quote:eq(2)').text())
          console.log($('.pi-image-thumbnail')[0].attribs.src)
        });
      } catch (error) {
        console.log(error, error.message);
      }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})