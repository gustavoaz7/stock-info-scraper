const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://www.fundamentus.com.br/detalhes.php?papel=';
const STOCK_ID = 'CARD3';

axios
  .get(BASE_URL + STOCK_ID)
  .then(res => res.data)
  .then(html => {
    const $ = cheerio.load(html);
    // Cotação
    console.log($('.data.destaque.w3').text());
  })
  .catch(err => {
    //handle error
    console.log('ERROR ==> ', err);
  });
