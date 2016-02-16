var fs = require('fs');
var cli = require('cli');
var path = require('path');
var guid = require('node-uuid');
var util = require('./utility.js');
var exec = require('child_process').exec;

function main(args) {
    // Copy files
    var templates = path.join(__dirname, 'templates');
    
    cli.setArgv(args);
    var options = cli.parse({
        taskname: ['n', 'Name of the task', 'string', null],
        friendlyName: ['f', 'Friendly name of task', 'string', null],
        description: ['d', 'Description of task', 'string', null],
        author: ['a', 'Author of task', 'string', null],
        guid: ['g', 'GUID for task', 'string', null],
        skip: ['s', 'Skip installing dependencies', 'on', false]
    });

    // Default to values passed in on the command line
    var author = options.author;
    var taskName = options.taskname;
    var description = options.description;
    var friendlyName = options.friendlyName;

    // Ask for any values they did not pass in on the command line
    if (taskName === null) {
        taskName = util.askSync('name', /.+/);
    }

    if (friendlyName === null) {
        friendlyName = util.askSync('friendlyName', /.+/);
    }

    if (description === null) {
        description = util.askSync('description', /.+/);
    }

    if (author === null) {
        author = util.askSync('author', /.+/);
    }   
    
    // Create folder structure
    console.log('Creating folders');
    var root = util.md(process.cwd(), taskName);
    var src = util.md(root, 'src');
    var test = util.md(root, 'test');

    console.log('Adding files');
    util.copy(['taskUnitTest.js'], templates, test);
    util.copy(['app.js', 'task.js'], templates, src);
    util.copy(['icon.png'], templates, root);

    var contents = fs.readFileSync(path.join(templates, 'task.json'), 'utf8');
    contents = contents.replaceAll('__guid__', guid.v4());
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
    
    if (options.skip) {
        process.exit();
    } else {
        console.log('Installing node modules');
        process.chdir(root);
        console.log('Installing mocha');
        exec('npm install -g mocha', function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            if (stderr) {
                console.log('stderr: ' + stderr);
            }
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            console.log('Installing instanbul');
            exec('npm install -g istanbul', function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                if (stderr) {
                    console.log('stderr: ' + stderr);
                }
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                console.log('Installing project dependencies');
                exec('npm install', function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    if (stderr) {
                        console.log('stderr: ' + stderr);
                    }
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }

                    process.exit();
                })
            })
        })
    }    
};

/*
 * Exports the portions of the file we want to share with files that require 
 * it.
 */
module.exports = {
    main: main
};