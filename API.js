const axios = require('axios');
const cheerio = require('cheerio');
const {
  BASE_URL,
  STOCK_INDICATORS,
  STOCK_INDICATORS_INDEX,
} = require('./constants');

module.exports = {
  scrapeStockInfo: stockCode => {
    return axios
      .get(BASE_URL + stockCode)
      .then(res => res.data)
      .then(html => {
        const $ = cheerio.load(html);
        const info = {};

        $('td.data>span.txt').each((i, elem) => {
          const indicator = STOCK_INDICATORS[STOCK_INDICATORS_INDEX.indexOf(i)];
          if (indicator) {
            info[indicator] = $(elem)
              .text()
              .trim();
          }
        });

        return info;
      })
      .catch(() => {
        console.log('Error trying to fetch stock info for:', stockCode);
      });
  },
};
