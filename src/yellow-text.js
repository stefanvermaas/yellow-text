(function($, window, document) {

  var Plugin, defaults, pluginName;

  pluginName = "yellowtext";

  defaults = {

    setFrameManual: false,
    width: 100,
    widthType: "%",
    height: 350,
    heightType: "px",

    container: "js-yellow-text-editor",
    buttons: "js-yellow-text-buttons",

    actions: ["bold", "underline", "italic", "strikethrough", "align-left", "align-center", "align-right", "unordered-list", "ordered-list", "link"]
  };

  Plugin = (function() {

    function Plugin(element, options) {

      // Define the plugin global elements
      this._name = pluginName;
      this.settings = $.extend({}, defaults, options);

      // Keep a copy of the first settings
      this._defaults = defaults;
      this._el = element;
      this.$_el = $( element );

      // Intantiate the plugin
      this.render();

      // After initializing listen to events
      this.events();
    }

    /*
    - Helper functions ----------------------------------------- #
    */

    Plugin.prototype.setContentForEditor = function() {
      this.$el.html( this.$_el.val() );
    };

    Plugin.prototype.setContentForTextarea = function() {
      this.$_el.val( this.$el.html() );
    };

    Plugin.prototype.cleanCode = function() {};

    /*
    - Render the plugin ----------------------------------------- #
    */

    Plugin.prototype.render = function() {

      // Hide the current element, preferable a textarea
      this.$_el.hide();

      // Create the container element
      container = this.createEditorContainer();

      // Define the main element, that we will use: the texteditor
      this.el = container;
      this.$el = $( this.el );

      // Add the editor after the textarea, the textarea
      // reference is kept in the this._el
      this.$_el.after( this.$el );

      // Set the frame of the editor if it's needed
      if( !this.settings.setFrameManual ) {
        this.setEditorFrame();
      }

      // If the textare has some content, add it to the text editor
      if( this.$_el.val() ) {
        this.setContentForEditor();
      }
    };

    Plugin.prototype.createEditorContainer = function() {
      return $("<div />").addClass(this.settings.container).css({
        "float": "left"
      }).attr("contenteditable", true);
    };

    Plugin.prototype.setEditorFrame = function() {
      this.$el.css({
        "width": this.settings.width + this.settings.widthType,
        "height": this.settings.height + this.settings.heightType
      });
    };

    /*
    - Listen to events ----------------------------------------- #
    */

    Plugin.prototype.events = function() {};

    /*
    - Plugin actions ----------------------------------------- #
    */

    Plugin.prototype.execute = function() {};

    return Plugin;

  })();

  return $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
