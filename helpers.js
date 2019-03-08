const { STOCK_INDICATORS } = require('./constants');

module.exports = {
  verifyIndicators: indicators => {
    if (!indicators.equals(STOCK_INDICATORS)) {
      throw new Error(
        'Scrape indicators does not match those from spreadsheet. Please double check before proceeding'
      );
    }
  },
  sleep: timer => {
    return new Promise(resolve => {
      setTimeout(resolve, timer);
    });
  },
};
