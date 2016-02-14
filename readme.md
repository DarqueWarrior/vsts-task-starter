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

