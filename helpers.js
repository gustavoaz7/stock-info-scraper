module.exports = {
  verifyIndicators: indicators => {
    if (!indicators.equals(STOCK_INDICATORS)) {
      throw new Error(
        'Scrape indicators does not match those from spreadsheet. Please double check before proceeding'
      );
    }
  },
};
