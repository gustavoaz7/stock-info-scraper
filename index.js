const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'http://www.fundamentus.com.br/detalhes.php?papel=';
const STOCK_ID = 'CARD3';

const STOCK_INFO_INDEX = {
  [1]: 'P',
  [13]: 'A',
  [46]: 'LL',
  [15]: 'LPA',
  [14]: 'P/L',
  [17]: 'VPA',
  [16]: 'P/VPA',
  [41]: 'PL',
  [44]: 'EBIT',
  [29]: 'ROE',
  [31]: 'LC',
  [37]: 'DB',
  [23]: 'ML',
};

axios
  .get(BASE_URL + STOCK_ID)
  .then(res => res.data)
  .then(html => {
    const $ = cheerio.load(html);
    $('td.data>span.txt').each((i, elem) => {
      STOCK_INFO_INDEX[i] &&
        console.log(
          STOCK_INFO_INDEX[i],
          $(elem)
            .text()
            .trim()
        );
    });
  })
  .catch(err => {
    //handle error
    console.log('ERROR ==> ', err);
  });
