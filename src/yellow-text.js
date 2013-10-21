(function() {
  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "yellowtext";
    defaults = {
      width: 100,
      widthType: "%",
      height: 350,
      heightType: "px",
      font: "Helvetica Neue, Helvetica, arial, sans-serief",
      fontSize: "1em",
      fontColor: "#000000",
      container: "js-editor-container",
      buttons: "js-editor-buttons",
      iframe: "js-editor-iframe",
      actions: ["bold", "underline", "italic", "strikethrough", "align-left", "align-center", "align-right", "unordered-list", "ordered-list", "link"]
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.render();
        this.setContentToEditor(this.getContentFromTextarea);
        this.events();
      }

      /*
      - Helper functions ----------------------------------------- #
      */


      Plugin.prototype.setContentForEditor = function(content) {};

      Plugin.prototype.setContentForTextarea = function(content) {};

      Plugin.prototype.getContentFromEditor = function() {};

      Plugin.prototype.getContentFromTextarea = function() {};

      Plugin.prototype.cleanCode = function() {};

      /*
      - Render the plugin ----------------------------------------- #
      */


      Plugin.prototype.render = function() {
        this.renderContainers();
        this.renderButtons();
      };

      Plugin.prototype.renderContainers = function() {};

      Plugin.prototype.renderButtons = function() {};

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

}).call(this);
