
var normalizedPath = require("path").join(__dirname);

require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if(!file.includes('index')) {
        var moduleName = file.split('.')[0]
        exports[moduleName] = require('./' + moduleName)
    }
});