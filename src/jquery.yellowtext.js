;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = 'yellowtext',
      defaults = {
        propertyName: 'value'
      };

  // The actual plugin constructor
  function Plugin ( element, options ) {

    // Define the element basics
    this.el  = element;
    this.$el = $(this.el);

    // Define the default options
    this.options = $.extend( {}, defaults, options );
    this._defaults = defaults;

    // Remember the plugin name
    this._name = pluginName;

    // Setup the rest of the plugin
    this.initialize();
  }

  Plugin.prototype = {

    // Setup the plugin for usage
    initialize: function () {
        console.log('xD');
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[ pluginName ] = function ( options ) {
    return this.each(function() {
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
      }
    });
  };

})( jQuery, window, document );
