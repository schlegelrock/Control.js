# Overview

Controls.js is a light-weight layer build for reusable javascript, built on jQuery. The framework helps:

* Control the HTML api to javascript object
* Control the name space where the object is created
* Control when each widget initialized

## Implementation:

First include the seed file:

	<script src="controls.js" type="text/javascript"></script>
	
You're then going to need to add some attributes to the HTML. If you're using a single "control", you can add data-control and data-config attributes to the node getting the action. If you want to add multiple controls to a single node, you'll want to use the data-controls (notice the "s") attribute for the entire structure. If you prefer using the data-controls, you may use this for a single control, as well.

	<a data-control="MyControl" data-config="{ config1: 'something' }">...</a>

or

	<a data-controls="{
		MyControl1: {
			config1: 'something1',
			config2: 'somethingElse1'
		},
		MyControl2: {
			config1: 'something2'
		}
	}">...</a>

or inline, if you prefer:

	<a data-controls="{ MyControl1: { config1: 'something1', config2: 'somethingElse1' }, MyControl2: { config1: 'something2', config2: 'somethingElse2' } }">...</a>
	
At OnDomReady Controls.js will look for the object "Control.MyControl" or "Control.MyControl1" & "Control.MyControl2" and create a new instance of them. As arguments it will pass a reference to the anchor tag and the config object. This allows each instance of the control to be uniquely configured and reusable.

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
	
This will find all data-control="" and data-controls="" attributes and attempt to initialize javascript objects for each, which is set by default to run onDomReady. However, it could easily be called before then.  An example of this would be if you wanted to load javascript for navigation, before loading the rest of the page. This gives you fine control over the sequence that your javascript loads. 

When a fragment of HTML is added to the DOM, it is simple to initialize new controls.  After the new fragment has been appended to the DOM, call parseFragment:

	$( 'my-new-fragment' ).parseFragment();

### Logging()

To log out a report of all Controls on the page, simply call:

	$().logControls();
	
This will write out to the console what controls have been initialize, whether it was successful, it's config and target node. 

For a clearer picture, feel free to check out the included demo. It's a simple example, but you'll get the picture.
