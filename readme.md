# vsts-task-starter

Creates a starting project structure for building a Node.js based Visual Studio Team Services task.

|-- taskName  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- icon.png  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- package.json  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- task.json  
|&nbsp;&nbsp;&nbsp;&nbsp;|-- src  
|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|-- app.js  
|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|-- task.js    
|&nbsp;&nbsp;&nbsp;&nbsp;|--test  
|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|-- taskUnitTest.js  

The command also installs Mocha and Istanbul globally for testing and code coverage.  Once the task is created you can test the task by running  
npm test  
from the task folder.

## Installation
```bash
sudo npm install -g vsts-task-starter
```
## Usage
```bash
createtask
```
## Command Line Interface (cli)
Any values not passed in as cli arguments will be prompted for when the command runs.  
* n - name of the task
* f - friendly name of the task
* d - description
* a - author  

```bash
createtask -n TaskName -f "Task Name" -a "Donovan Brown" -d "My cool task"  
```