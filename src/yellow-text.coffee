do ($ = jQuery, window, document) ->

  ###
  Create the default instances
  ###
  pluginName = "yellowtext"
  defaults =

    # Editor dimmension settings
    width: 100,
    widthType: "%", # Can be px or %
    height: 350,
    heightType: "px", # Can be px or %

    # Editor styling settings
    font: "Helvetica Neue, Helvetica, arial, sans-serief",
    fontSize  : "1em",
    fontColor : "#000000",

    # Editor HTML container classes
    container: "js-editor-container",
    buttons: "js-editor-buttons",
    iframe: "js-editor-iframe",

    # Editor actions
    actions: ["bold", "underline", "italic", "strikethrough", "align-left", "align-center", "align-right", "unordered-list", "ordered-list", "link"]

  ###
  Create the actual plugin
  ###
  class Plugin
    constructor: (@element, options) ->

      # Apply the settings to the editor
      @settings = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      # Initialize the plugin
      @render()

      # Make sure we've got all the content
      @setContentToEditor( @getContentFromTextarea )

      # Subscribe to all the events
      @events()

    ###
    - Helper functions ----------------------------------------- #
    ###
    setContentForEditor: ( content ) ->
    setContentForTextarea: ( content ) ->
    getContentFromEditor: ->
    getContentFromTextarea: ->
    cleanCode: ->

    ###
    - Render the plugin ----------------------------------------- #
    ###
    render: ->
      @renderContainers() # Render the containers
      @renderButtons() # Render the buttons
      return

    renderContainers: ->
    renderButtons: ->

    ###
    - Listen to events ----------------------------------------- #
    ###
    events: ->

    ###
    - Plugin actions ----------------------------------------- #
    ###
    execute: ()->


  # A really lightweight plugin wrapper around the constructor,
  # preventing against multiple instantiations
  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new Plugin(@, options))