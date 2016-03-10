var sinon = require('sinon');
var assert = require('assert');
var task = require('../src/task.js');

describe('task', function() {
   'use strict'; 
   
   it('should run without error', function() {
      /* Arrange */ 
      
      /*   Act   */
      task.run();
      
      /*  Assert */
      assert.ok(true);
   });
});