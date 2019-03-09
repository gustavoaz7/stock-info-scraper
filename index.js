require('./ArrayEquals');
const Excel = require('exceljs');
const workbook = new Excel.Workbook();
const { scrapeStockInfo } = require('./API');
const { verifyIndicators, sleep, makeTableVisible } = require('./helpers');
const {
  STOCK_INDICATORS,
  FIRST_STOCK_ROW,
  FIRST_INDICATOR_COLUMN,
} = require('./constants');

(async function() {
  try {
    const spreadSheet = await workbook.xlsx.readFile('./Stock Analysis.xlsx');
    const worksheet = spreadSheet.getWorksheet(1);
    // worksheet works in a 1-based column/row number (first element is empty)
    let indicators = worksheet.getRow(1).values;
    makeTableVisible({ worksheet, indicators });
    // remove two last which are calculated using other indicators
    indicators = indicators.slice(FIRST_INDICATOR_COLUMN, -2);

    verifyIndicators(indicators);

    const stockCodes = worksheet.getColumn(1).values.slice(FIRST_STOCK_ROW);
    const stockCodesSize = stockCodes.length;
    const failedStocks = [];
    for (let index = 0; index < stockCodesSize; index++) {
      await sleep(1500);
      const stockCode = stockCodes[index];
      const remainingItems = stockCodesSize - (index + 1);
      const stockRow = worksheet.getRow(FIRST_STOCK_ROW + index);
      const remainingMessage =
        remainingItems > 0
          ? `only ${remainingItems} remaining`
          : 'this is the last one!';
      try {
        console.log(`Fetching ${stockCode} ... ${remainingMessage}`);
        const stockInfo = await scrapeStockInfo(stockCode);
        console.log('\u2713');
        STOCK_INDICATORS.forEach((indicator, i) => {
          stockRow.getCell(FIRST_INDICATOR_COLUMN + i).value =
            stockInfo[indicator];
        });
      } catch (e) {
        console.log('X');
        failedStocks.push(stockCode);
      }
    }
    if (failedStocks.length) {
      console.log('\nFailed fetching stock info for the following companies:');
      console.log(failedStocks.join('  '));
    }
    return workbook.xlsx.writeFile('./Stock Analysis.xlsx');
  } catch (e) {
    console.log(e);
  }
})();
