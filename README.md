# Stock Info Scraper
A simple project to help you keep your stocks up to date with zero effort.

## Requirements
* Node.js
* npm

## Getting Started
After confirming that your development environment meets the specified [requirements](#requirements), you can follow these steps to get the project up and running:

```bash
$ git clone https://github.com/gustavoaz7/stock-info-scraper.git
$ cd stock-info-scraper
$ npm install
```

## How To Use
> Please refer to `Template.xlsx`

First you need to set all stock codes you want to keep track on the first column and set their respective sectors on the second one _(in order to make a better analysis)_.

* Update all  
To update all stock info simply run the following code
```bash
npm start
```
* Update specific stock  
Sometimes you add a new stock to the spreadsheet and just want info for that one. In this case you can simply add that stock code as argument to the previews code
```bash
npm start ITSA4                 # Gets ITSA4 info only
npm start ELET3 ELET6 TAEE3     # Gets info for all provided stock codes
```

## Build With
* [axios](https://github.com/axios/axios)
* [cheerio](https://github.com/cheeriojs/cheerio)
* [exceljs](https://github.com/exceljs/exceljs)
