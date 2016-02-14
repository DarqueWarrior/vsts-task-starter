var fs = require('fs');
var os = require('os');
var path = require('path');
var guid = require('guid');
var exec = require('child_process').exec;

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

// Copy files
var templates = path.join(__dirname, 'templates');

ask('name', /.+/, function (taskName) {
    ask('friendlyName', /.+/, function (friendlyName) {
        ask('description', /.+/, function (description) {
            ask('author', /.+/, function (author) {
    
                // Create folder structure
                console.log('Creating folders');
                var root = md(process.cwd(), taskName);
                var src = md(root, 'src');
                var test = md(root, 'test');

                console.log('Adding files');
                copy(['taskUnitTest.js'], templates, test);
                copy(['app.js', 'task.js'], templates, src);
                copy(['icon.png'], templates, root);

                var contents = fs.readFileSync(path.join(templates, 'task.json'), 'utf8');
                contents = contents.replaceAll('__guid__', guid.raw());
                contents = contents.replaceAll('__taskname__', taskName);
                contents = contents.replaceAll('__friendlyName__', friendlyName);
                contents = contents.replaceAll('__description__', description);
                contents = contents.replaceAll('__author__', author);
                fs.writeFileSync(path.join(root, 'task.json'), contents);

                contents = fs.readFileSync(path.join(templates, 'package.json'), 'utf8');
                contents = contents.replaceAll('__taskname__', taskName.toLowerCase());
                contents = contents.replaceAll('__description__', description);
                contents = contents.replaceAll('__author__', author);
                fs.writeFileSync(path.join(root, 'package.json'), contents);

                console.log('Installing node modules');
                process.chdir(root);
                console.log('Installing mocha');
                exec('npm install -g mocha', function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    if (stderr !== '') {
                        console.log('stderr: ' + stderr);
                    }
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                    console.log('Installing instanbul');
                    exec('npm install -g istanbul', function (error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        if (stderr !== '') {
                            console.log('stderr: ' + stderr);
                        }
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                        console.log('Installing project dependencies');
                        exec('npm install', function (error, stdout, stderr) {
                            console.log('stdout: ' + stdout);
                            if (stderr !== '') {
                                console.log('stderr: ' + stderr);
                            }
                            if (error !== null) {
                                console.log('exec error: ' + error);
                            }

                            process.exit();
                        })
                    })
                })
            })
        })
    })
})