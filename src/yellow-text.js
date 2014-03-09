;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "yellowtext",
        defaults = {
        propertyName: "value"
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {

        // Define the element where the plugin is attached too
        this.el = element;
        this.$el = $(this.el);

        // Define the basic settings
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        // Initlaize the plugin
        this.init();
    }

    Plugin.prototype = {
        initialize: function () {
            console.log("xD");
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        // chain jQuery functions
        return this;
    };

})( jQuery, window, document );