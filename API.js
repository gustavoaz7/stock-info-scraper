const axios = require('axios');
const cheerio = require('cheerio');
const {
  BASE_URL,
  STOCK_INDICATORS,
  STOCK_INDICATORS_INDEX,
  HOME_URL,
} = require('./constants');

const headers = {};

module.exports = {
  scrapeStockInfo: stockCode => {
    return axios
      .get(BASE_URL + stockCode, { headers })
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
        throw Error();
      });
  },
  /**
   * For some specific stock codes the website I am using returns a status 301 redirecting to an invalid website.
   * This happens when you try to access that stock info directly (no previous connection to the website).
   *   Steps to replicate this issue:
   *   Open an incognito window -> chrome dev tools -> networking -> acess that stock URL directly (eg. ITSA4)
   * In order to solve this, the first thing I do is to access the home website and save my cookie.
   * Setting this cookie on my stock requests headers fix this issue.
   */
  setCookie: () => {
    axios.get(HOME_URL).then(res => {
      const cookie = res.headers['set-cookie'];
      headers.Cookie = cookie;
    });
  },
};
