require('./ArrayEquals');
const Excel = require('exceljs');
const workbook = new Excel.Workbook();
const { STOCK_INDICATORS } = require('./constants');
const { scrapeStockInfo } = require('./API');
const { verifyIndicators } = require('./helpers');

workbook.xlsx
  .readFile('./Stock Analysis.xlsx')
  .then(spreadSheet => {
    const worksheet = spreadSheet.getWorksheet(1);
    // worksheet works in a 1-based column/row number (first element is empty)
    let indicators = worksheet.getRow(1).values;
    // remove first two items which are not indicators & two last which are calculated using other indicators
    indicators = indicators.slice(3, -2);

    verifyIndicators(indicators);

    const stockCodes = worksheet.getColumn(1).values.slice(2);
    const indexTest = 1;
    console.log('stockCode', stockCodes[indexTest]);
    const test = worksheet.getRow(2 + indexTest);

    scrapeStockInfo(stockCodes[indexTest]).then(stockInfo => {
      // console.log('stockInfo', stockInfo);
      STOCK_INDICATORS.forEach((indicator, i) => {
        console.log('stockInfo[indicator]', stockInfo[indicator]);
        test.getCell(3 + i).value = stockInfo[indicator];
      });

      return workbook.xlsx.writeFile('./Stock Analysis.xlsx');
    });
  })
  .catch(e => {
    console.log(e);
  });
