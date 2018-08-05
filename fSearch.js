#! /usr/local/bin/node
let fs = require('fs');
let relPath = require('./relPath');
let store = require('./fStore');

let args = [
    { arg: '-a', name: 'andTags', type: 'array' },
    { arg: '-c', name: 'category', type: 'array' },
    { arg: '-o', name: 'orTags', type: 'array' },
    { arg: '-r', name: 'readMode', type: 'boolean' },
    { arg: '-n', name: 'name', type: 'string' },
    { arg: '-f', name: 'fullPath', type: 'boolean' },
    { arg: '-l', name: 'limit', type: 'number', default: 1 }
]

let query = require('./argParse')(args, process.argv);

function logMatch(match) {
    let name = query.fullPath ? match.path : relPath(match.path);
    console.log(name);
    if (query.readMode) console.log(`(${match.category || ""}) [${match.tags.join(', ')}] `) 
}


function main() {
    console.log(query);
    let matches = store.searchStore(query);

    if (matches) {
        if (!query.default.limit) matches = matches.slice(0, query.limit);
        matches.forEach(logMatch)
    }

    process.exit(1);
}

main()
