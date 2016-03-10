/*
 * This is written as a self calling function so I don't have to place
 * 'use strict' in global scope.
 * This prevents problems when concatenating scripts that are not strict.
 */
(function () {
    'use strict';
    
    /*
     * This file bootstraps the code that does the real work.  Using this technique
     * makes testing very easy.
     */

    // Contains the code for this task.  It is put in a separate module to make 
    // testing the code easier.
    var task = require('./task.js');
    
    // Call the task
    task.run();
}());