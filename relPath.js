function removeTrailingLetters(str) {
    let lastD = str.lastIndexOf('/')
    return str.slice(0, lastD + 1);
}

function commonPath(pathOne, pathTwo) {
    let common = '';
    for (let i = 0; i < pathOne.length; i++) {
        if (pathOne.charAt(i) == pathTwo.charAt(i)) common += pathOne.charAt(i);
        else return removeTrailingLetters(common);
    }
    return removeTrailingLetters(common);
}

module.exports = function (fullPath) {
    let wd = process.cwd() + '/'
    if (fullPath.startsWith(wd)) {
        return './' + fullPath.slice(wd.length, fullPath.length);
    } else {
        let common = commonPath(wd, fullPath);
        let wdPathDif = wd.slice(common.length, wd.length);
        let fullPathDif = fullPath.slice(common.length, fullPath.length);

        let upDirs = wdPathDif.split('/').length - 1;
        let upString = "../".repeat(upDirs);
        return upString + fullPathDif;
    }
}
