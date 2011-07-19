// Define global namespace
if (typeof Control == "undefined" || !Control ) {
  var Control = {};
}

// Helper to extend a namespace off of "ctrl"
Control.define = function( namespace ) {
  return $.extend( Control, namespace );
};

(function() {
  
  var controlLog = [];
  
  function initControls( nodes ) {
    
    $( nodes ).each( function() {

      var control, 
          config, 
          originalName,
          originalConfig,
          status,
          scope = window.Control,
          valid = true,
          obj = null;
      
      control = originalName   = $( this ).attr( "data-control" );
      config  = originalConfig = $( this ).attr( 'data-config' );
      config = ( config ) ? eval( [ "(", config, ")" ].join( "" ) ) : {};
      
      if ( !scope[ control ] ) {
        valid = false;
      } else {
        valid = true;
        scope = Control[ control ];
      }
    
      if ( valid ) {
        obj = new scope( this, config );
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
      
      $( this ).removeAttr( "data-control" ) // convert to done
               .attr( "data-control-init", originalName );
    });
    return this;
  };
  
  $.fn.parseFragment = function ( ) {
    var contrls = $( this ).find( '*[ data-control ]' );
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