#! /usr/local/bin/node
const fs = require('fs');
const path = require('path');
const store = require('./fStore');

let args = [
    { arg: '-t', name: 'tags', type: 'array' },
    { arg: '-d', name: 'deleteMode', type: 'boolean' },
    { arg: '-r', name: 'read', type: 'boolean' },
    { arg: '-q', name: 'quiet', type: 'boolean' },
    { arg: '-v', name: 'verbose', type: 'boolean' },
]

let argv = require('./argParse')(args, process.argv);

const fileTypes = {
    'document': ['txt', 'doc', 'docx', 'md', 'rtf', 'html'],
    'book': ['pdf', 'mobi', 'epub', 'djvu', 'epub', ],
    'code': ['js', 'ts', 'c', 'cc', ],
    'data': ['json', 'zip', 'csv', 'db', 'bz2', 'ini', 'rar' ],
    'video': ['mkv', 'mp4', 'wmv', 'mpg', 'avi', 'swf',],
    'image': ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg' ],
    'audio': ['mp3', 'wav']
}

const logPriority = argv.verbose ? 2 : argv.quiet ? 0 : 1;

const tail = (iter) => iter.slice(1, iter.length);

const standardExt = (fileName) => tail(path.extname(fileName)).toLowerCase(); 

const findKeyIncluding = (obj, value) => Object.keys(obj).find(key => obj[key].includes(value))

const getFileCategory = (fileName) => findKeyIncluding(fileTypes, standardExt(fileName));

const getFileNames = (files, dirName) => files.map(file => path.join(dirName, file));

const dirFileNames = (dir) => getFileNames(fs.readdirSync(dir), dir);

const getDirFiles = (files) => files.reduce((all, file) => { 
    return file.type == 'dir' ? all.concat(getDirFiles(file.files)) : all.concat([file]) }, []);

const perform = (...actions) => (input) => actions.forEach(action => action(input));

const tagDeleter = (tags) => (file) => tags.forEach((tag) => file.tags.includes(tag) ? file.tags.splice(file.tags.indexOf(tag), 1) : null);

const tagAdder = (tags) => (file) => tags.forEach(tag => file.tags.includes(tag) ? null : file.tags.push(tag));

const readTags = (file) => argv.read ? log(0, `${path.basename(file.path)} Tags: ${file.tags.join(', ')}`) : null;


function exitMessage (msg) { 
    log(1, msg); 
    if (logPriority == 2) console.timeEnd("ftag"); 
    process.exit(1);
}

function log(priority, ...expressions) {
    if (priority > logPriority) return false;
    expressions.forEach(expr => console.log(expr));
}

function createFileRecord(fileData) {
    let fileCat = getFileCategory(fileData.path);
    if (!fileCat) {
        log(2, "Unrecognized Extension for " + fileRecord.path)
        return null;
    } else {
 let fileRecord = Object.assign({ category: fileCat, tags: [] }, fileData);
    log(2, "Creating New Entry for " + fileRecord.path)
    store.addToStore(fileRecord);
    return fileRecord;
    }
   }


function getFileData(files) {
    return files.map((file) => {
        let stats;
        try {
            stats = fs.statSync(file);
        } catch(e) {
            exitMessage("File Not Found: " + file)
        }

        if (stats.isFile(file)) return { path: file, type: "file" };
        else if (stats.isDirectory(file)) {
            return { name: file, type: 'dir', files: getFileData(dirFileNames(file)) };
        }
    })
}

function getFileRecords(files) {
    let filesOnly = getDirFiles(files).filter(f => f.type == 'file')
    log(1, "Files: " + filesOnly.map(f => path.basename(f.path)).join(', '))
    return filesOnly.map((file) => {
        let existing = store.searchStore({ path: file.path })
        if (existing) log(2, "Updating File: " + existing[0].path)
        return existing ? existing[0] : createFileRecord(file);
    }).filter(f => f);
}

function setTags(tags, files) {
    log(1, "Setting Tags: " + tags.join(', '))
    let addTags = tagAdder(tags);
    getFileRecords(files).forEach(perform(addTags, readTags));
}


function remTags(tags, files) {
    log(1, "Deleting Tags: " + tags.join(', '));
    let deleteTags = tagDeleter(tags);
    getFileRecords(files).forEach(perform(deleteTags, readTags));
}

function validateArgs() {
    if (!argv._ || argv._.length < 1) exitMessage("No files Specified - Enter file / directories before other options.");
    else if (!argv.tags || argv.tags.length < 1) exitMessage("Specify tags to apply with -t");
}

function main() {
    console.time("ftag");

    validateArgs();
    let files = getFileData(getFileNames(argv._, process.cwd()));
    let tags = argv.tags;

    if (argv.deleteMode) remTags(tags, files);
    else setTags(tags, files);

    store.saveStore((err, saved) => {
        if (err) exitMessage(err); 
        else exitMessage(`Saved ${files.length} files`);
    });
}

main();
