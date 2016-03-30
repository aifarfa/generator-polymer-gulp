'use strict';

const path = require('path');
const fs = require('fs');
const jsOnly = (name) => { // only *.js
  return (/(\.(js)$)/i).test(path.extname(name));
};

/**
 * read alltask form gulp/ directory
 * @type Array
 */
const tasks = fs.readdirSync('./gulp/').filter(jsOnly);

tasks.forEach((file) => {
  require('./gulp/' + file);
});
