
module.exports = function (args, argv) {
    let defaultSet = args.filter(a => a.default).reduce((acc, cur) => {acc[cur.name] = false; return acc; }, {})

    let byPosition = args.map(arg => Object.assign(arg, { index: argv.indexOf(arg.arg) }))
        .filter(arg => ('default' in arg) || arg.index >= 0).sort((a, b) => a.index - b.index);
    return byPosition.reduce((acc, cur, i) => {
       if (cur.default && (args.map(a => a.arg).includes(argv[cur.index+1]) || !argv[cur.index+1]) ) { 
           acc[cur.name] = cur.default;
       } else if (cur.index < 0) {
            acc.default[cur.name] = true;
           acc[cur.name] = cur.default;
        } else if (cur.type == 'array') {
            let nextArg = byPosition[i + 1] ? byPosition[i + 1].index : argv.length;
            acc[cur.name] = argv.slice(cur.index + 1, nextArg);
        } else if (cur.type == 'boolean') acc[cur.name] = true;
        else acc[cur.name] = argv[cur.index + 1];

        return acc;
    }, { default: defaultSet,  _: argv.slice(2, byPosition[0] ? byPosition[0].index : argv.length) })
}
