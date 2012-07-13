Control.define( 'SizeToggle' );
Control.SizeToggle = function (el, config) {
  var style = {},
      state = 'off';
  for (key in config) {
    style[key] = $(el).css(key);
  }
  
  $(el).on('click', function() {
    if (state == 'off') {
      $(this).animate(config);
      state = 'on';
    } else {
      $(this).animate(style);
      state = 'off';
    }
  });
}