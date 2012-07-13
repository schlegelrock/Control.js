// Define global namespace
if ( typeof Control === "undefined" || !Control ) {
  var Control = {};
}

// Helper to extend a namespace off of "ctrl"
Control.define = function( namespace ) {
  return $.extend( Control, namespace );
};

(function() {
  
  var controlLog = [];
  
  function initControls( nodes ) {
    nodes.each( function() {

      var controls = $( this ).data( 'controls' ),
          control, 
          config,
          originalName,
          originalNames = [],
          self = this;

      if ( typeof( controls ) !== "undefined" ) {
        controls = JSON.parse( controls );
      }

      /**
       * handleControl will do all of the business
       * 
       * returns originalName
       */
      var handleControl = function ( control ) {
        var originalName,
            originalConfig,
            scope = Control,
            status,
            valid = true,
            obj = null;

        originalName = control.toString(); // assures it's not passed by reference

        if ( typeof( controls ) === "undefined" ) {
          config = $(self).data( 'config' );
          if ( typeof( config ) !== "undefined" ) {
            config = JSON.parse( config );
          }
        } else {
          config = controls[ control ];
        }
        originalConfig = JSON.stringify( config ); // assures not passed by reference

        if ( !scope[ control ] ) {
          valid = false;
        } else {
          valid = true;
          scope = Control[ control ];
        }
    
        if ( valid ) {
          obj = new scope( self, config );
          status = 'success';
        } else {
          console.log( "Error: The object '" + originalName + "' isn't found. Make sure your dependancies are resolved." );
          status = 'failure';
        }
        
        var logMessage = {
          'CName': originalName,
          'Status': status,
          'config': originalConfig
        };
        controlLog.push( logMessage );

        return originalName;

        $( self ).removeAttr( "data-control" ) // convert to done
                 .attr( "data-control-init", originalName );
      }

      if ( typeof( controls ) !== "undefined" ) {
        for ( control in controls ) {

          originalName = handleControl( control );
          originalNames.push( originalName );

        }
        $( this ).removeAttr( "data-controls" )
                 .attr( "data-controls-init", originalNames );
      }

      control = originalName = $( this ).data( "control" );
      if ( typeof( control ) !== "undefined" ) {
        originalName = handleControl ( control );
        $( this ).removeAttr( "data-control" ) // convert to done
                 .attr( "data-control-init", originalName );
      }
    });

    return this;
  };
  
  $.fn.parseFragment = function () {
    var contrls = $( this ).find( '[ data-control ], [ data-controls ]' );
    initControls( contrls );
    return this;
  };
  
  $.fn.logControls = function () {
    for ( var i = 0; i < controlLog.length; i++ ) {
      var c = controlLog[i];
      console.log( (i + 1) + '. NAME: '+ c.CName + ' STATUS: ' + c.Status + ' CONFIG: ' + c.config.toString()  );
    };
    return this;
  };
  
})();

// Init controls
$( document ).ready( function() {
  $( 'body' ).parseFragment();
});


// stub function for console if isn't present
if ( !window.console ) {
  window.console = {
    log: function(){}
  };
}