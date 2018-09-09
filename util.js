let path = require('path');

const tail = (iter) => iter.slice(1, iter.length);

const standardExt = (fileName) => tail(path.extname(fileName)).toLowerCase(); 

const findKeyIncluding = (obj, value) => Object.keys(obj).find(key => obj[key].includes(value))

const perform = (...actions) => (input) => actions.forEach(action => action(input));

const hasAny = (qArray, tArray) => qArray.some(q => tArray.some(t => t == q));

const hasAll = (qArray, tArray) => qArray.every(q => tArray.includes(q));

module.exports = { tail, standardExt, findKeyIncluding, perform, hasAny, hasAll }
