# Overview

Controls.js is a light-weight layer build for reusable javascript. The framework helps:

* Control the HTML api to javascript object
* Control the name space where the object is created
* Control when each widget initialized

## Implementation:

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

## Controls.js API Methods

There are only two public methods to call on controls.js. The are: 

### ParseFragment()

This is the main API for controls to be initialized. When controls.js loads, this code is executed onDomReady:

	$( 'body' ).parseFragment();
	
This will find all data-control="" attributes and attempt to initialize javascript objects for each, which is set by default to run onDomReady. However, it could easily be called before then.  An example of this would be if you wanted to load javascript for navigation, before loading the rest of the page. This gives you fine control over the sequence that your javascript loads. 

When a fragment of HTML is added to the DOM, it is simple to initialize new controls.  After the new fragment has been appended to the DOM, call parseFragment:

	$( 'my-new-fragment' ).parseFragment();

### Logging()

To log out a report of all Controls on the page, simply call:

	$().logControls();
	
This will write out to the console what controls have been initialize, whether it was successful, it's config and target node. 

