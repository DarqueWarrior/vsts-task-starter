var fs = require('fs');
var path = require('path');
var deasync = require('deasync');

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function ask(question, format, callback) {
    var stdin = process.stdin, stdout = process.stdout;

    stdin.resume();
    stdout.write(question + ': ');

    stdin.once('data', function (data) {
        data = data.toString().trim();

        if (format.test(data)) {
            callback(data);
        } else {
            stdout.write('It should match: ' + format + '\n');
            ask(question, format, callback);
        }
    });
}

function askSync(question, format) {
    var result;

    ask(question, format, function (value) {
        result = value;
    });

    while (result === undefined) {
        deasync.sleep(100);
    }

    return result;
}

function md(dir, folder) {
    'use strict';

    var folderPath = path.join(dir, folder);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    return folderPath;
}

/*
* fileNames is an array of file names to copy from templates to dest
*/
function copy(fileNames, templates, dest) {

    fileNames.forEach(function (fileName) {
        var fileTemp = path.join(templates, fileName);
        var fileDest = path.join(dest, fileName);

        fs.writeFileSync(fileDest, fs.readFileSync(fileTemp));
    });
}

/*
 * Exports the portions of the file we want to share with files that require 
 * it.
 */
module.exports = {
    copy: copy,
    md: md,
    ask: ask,
    askSync: askSync
};