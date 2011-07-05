Overview
================

Controls.js is a light-weight layer build for reusable javascript. It help control: 

* The HTML api to javascript object
* The name space where the object is created
* When each widget initialized

Implementation:
----------------

First include the seed file:

	<script src="controls.js" type="text/javascript"></script>
	
In HTML, add data-control and data-config attributes to the node getting the action. 

	<a data-contorl="MyControl" data-config="{ config1: 'something' }">...</a>
	
At OnDomReady Controls.js will look for the object "Control.MyControl" and create a new instance of it. As arguments it will pass a reference to the anchor tag and the config object. This allows each instance of myControls to be uniquely configured and reusable.

In a second file myControl.js, the javascript object for MyControl would have to be defined and assigned to a function. The guts of this function is your custom code. 

	Control.define( 'MyControl' ); 
	Control.MyControl = function( el, config ) {
	  // guts go here
	}

	