
module.exports = function(fullPath) {
    let wd = process.cwd();

    if (fullPath.includes(wd)) return fullPath.slice(wd.length + 1, fullPath.length);
    else  {
        let pathDirs = wd.split('/');
        for (let i = pathDirs.length; i > 0; i--) {
            let currentPath = pathDirs.slice(0, i).join('/');
            if (fullPath.startsWith(currentPath)) return '../'.repeat(pathDirs.length - i) + fullPath.slice(currentPath.length + 1, fullPath.length);  
        }
    }
}
