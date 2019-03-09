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
  /**
   * For some weird reason, everytime exceljs access my spreadsheet it hides every column and row.
   * This function is a workaround for this issue, making my table visible again.
   */
  makeTableVisible: ({ worksheet, indicators }) => {
    indicators.forEach((e, i) => {
      worksheet.getColumn(i).hidden = false;
    });
    worksheet.eachRow(row => {
      row.hidden = false;
    });
  },
};
