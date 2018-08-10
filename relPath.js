function commonPath (pathOne, pathTwo) {
    let common = '';
    for (let i = 0; i < pathOne.length; i++) {
       if (pathOne.charAt(i) == pathTwo.charAt(i)) common += pathOne.charAt(i);
       else return common;
    }
    return common;
}

module.exports = function(fullPath) {
    let wd = process.cwd();
    if (fullPath.startsWith(wd)) {
        return fullPath.slice(wd.length + 1, fullPath.length);
    } else  {
        let common = commonPath(wd, fullPath);
        let wdPathDif = wd.slice(common.length, wd.length);
        let fullPathDif = fullPath.slice(common.length, fullPath.length);

        let upDirs = wdPathDif.split('/').length;
        let upString = "../".repeat(upDirs);
        return upString + fullPathDif;
    }
}
