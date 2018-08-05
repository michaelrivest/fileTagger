let fs = require('fs')
let path = require('path');
let store = require('./store');

const hasAny = (qArray, tArray) => qArray.some(q => tArray.some(t => t == q));

const hasAll = (qArray, tArray) => qArray.every(q => tArray.includes(q));

const addToStore = (fileRecord) => store.push(fileRecord);

function saveStore(cb) { 
    fs.writeFile(path.join(__dirname, './store.json'), JSON.stringify(store), cb);  
}

function buildChecks(q) {
    let checks = [];
    if (q.path) checks.push((file) => file.path == q.path);
    if (q.type) checks.push((file) => file.type == q.type);

    if (q.name) checks.push((file) => path.basename(file.path).toLowerCase().includes(q.name.toLowerCase()))

    if (q.category) checks.push((file) => q.category.includes(file.category));
    if (q.orTags && q.orTags.length > 0) checks.push((file) => hasAny(q.orTags, file.tags));
    if (q.andTags && q.andTags.length > 0) checks.push((file) => hasAll(q.andTags, file.tags));

    return (file) => checks.every((check) => check(file))
}

function searchStore(query) {
    let fileChecker = buildChecks(query);
    let matches = store.filter(fileChecker);
    return matches.length > 0 ? matches : false;
}

module.exports = {
    searchStore: searchStore,
    addToStore: addToStore,
    saveStore: saveStore
}