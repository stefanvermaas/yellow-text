;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = 'yellowtext',
      defaults = {
        width:    '100%',
        height:   '500px'
      };

  // The actual plugin constructor
  function Plugin ( element, options ) {

    // Define the element basics
    this.el   = element;
    this.$el  = $(this.el);
    this._$el = this.$el;

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

      // Hide the current element
      this.$el.hide();

      // Create the plugin skeleton
      this.createPluginSkeleton();
    },

    /**
     *  createPluginSkeleton() creates the new skeleton for the text editor
     *  after this function, the othere elements of the plugin can be
     *  initialized.
     *
     *  @return element
     */
    createPluginSkeleton: function() {

      // Create the editors container
      this.$container = this.createContainerElement();

      // Create the new iframe/editor window
      this.$editor = this.createEditorElement();

      // Create the button bar
      this.$buttonBar = this.createButtonBarElement();
    },

    createContainerElement: function() {

      // Create the editor container element
      var $container = $( document.createElement('div') ).css({
        'float':    'left',
        'width':    this.options.width,
        'height':   this.options.height
      });

      // Append the container after the element
      this.$el.after( $container );
      return $container;
    },

    createEditorElement: function() {

      // Define the variables
      var $editor, editor;

      // Create the editor (iFrame)
      $editor = $( document.createElement('iframe') ).css({
        'float':    'left',
        'width':    this.options.width,
        'height':   this.options.height,
        'border':   0,
        'overflow': 'hidden'
      });

      // Append the editor to the container
      $editor.appendTo( this.$container );

      /**
       *  NOTE: We need to open, close and put the design mode on, to be able
       *  to edit the content of the iFrame.
       */
      editor = $editor.get(0);
      editor.contentWindow.document.open();
      editor.contentWindow.document.close();
      editor.contentWindow.document.designMode = 'on';

      // Return the jQuery editor element
      return $editor;
    },

    createButtonBarElement: function() {

    },

    helpers: {

      /**
       *  The following functions hasClass(), addClass(), removeClass() and
       *  toggleClass() are borrowed from the Mozilla hack site and are used
       *  because they can be 50-80% faster than the jQuery implementation of
       *  these functions.
       *
       *  More information: https://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/
       *  and some benchmarks: http://jsperf.com/jquery-addclass-vs-dom-classlist/10
       */
      hasClass: function (elm, className) {

        // Validate the presence of the classList property
        if (document.documentElement.classList) {
          hasClass = function (elm, className) {
            return elm.classList.contains(className);
          };
        } else {
          hasClass = function (elm, className) {
            if (!elm || !elm.className) { return false; }

            var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
            return elm.className.match(re);
          };
        }

        // Check for the given className
        return hasClass(elm, className);
      },

      addClass: function (elm, className) {
        if (document.documentElement.classList) {
          addClass = function (elm, className) {
            elm.classList.add(className);
          };
        } else {
          addClass = function (elm, className) {
            if (!elm) { return false; }
            if (!containsClass(elm, className)) {
                elm.className += (elm.className ? ' ' : '') + className;
            }
          };
        }

        // Add the given className
        return addClass(elm, className);
      },

      removeClass: function (elm, className) {
        if (document.documentElement.classList) {
          removeClass = function (elm, className) {
            elm.classList.remove(className);
          };
        } else {
          removeClass = function (elm, className) {
            if (!elm || !elm.className) { return false; }

            var regexp = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
            elm.className = elm.className.replace(regexp, '$2');
          };
        }

        // Remove the given className
        return removeClass(elm, className);
      },

      toggleClass: function (elm, className) {
        var that = this;

        if (document.documentElement.classList) {
          toggleClass = function (elm, className) {
            return elm.classList.toggle(className);
          };
        } else {
          toggleClass = function (elm, className) {
            if (containsClass(elm, className)) {
              that.removeClass(elm, className);
              return false;
            } else {
              that.addClass(elm, className);
              return true;
            }
          };
        }

        // Toggle the given className
        return toggleClass(elm, className);
      }
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
