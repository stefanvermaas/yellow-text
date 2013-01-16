(function( $ ){
  $.fn.texteditor = function( options ) {

    // Create some standard options
    var settings = $.extend( {
      "width"           : "100%",
      "height"          : "300px",
      "containerClass"  : "js-editor-container",
      "buttonsClass"    : "js-editor-buttons",
      "iFrameClass"     : "js-editor-iframe",
      "formID"          : "js-editor-form",
      "cleanOnSubmit"   : true,
      "defaultFont"     : "Helvetica Neue, Helvetica, arial, sans-serief",
      "defaultFontSize" : "1em",
      "defaultFontColor": "#000000",
      "defaultActions"  : "bold, underline, italic, strikethrough, align-left, align-center, align-right, unorderd-list, ordered-list, link, image"
    }, options);

    // Return each attached object
    return this.each( function() {

      // Predefine the main $(this) object (html object)
      var that = $(this);

        /**
        *
        *   SETUP:
        *   This is the basic setup to make the editor work (+ some extra positioning)
        **/

        // Hide the element where we bind this plugin too
        that.hide();

        // Create a container which will hold or text editor
        var container = $("<div />").addClass(settings.containerClass).css({
          "float"   : "left",
          "width"   : settings.width,
          "border"  : "1px solid #ccc"
        });

        // Add the container after the element where we bind this plugin too
        that.after(container);

        // Create the iFrame and append to the previously created container
        var editor = $("<iframe />").addClass(settings.iFrameClass).css({
          "float"   : "left",
          "width"   : settings.width,
          "height"  : settings.height,
          "border"  : "0",
          "overflow": "hidden"
        }).appendTo(container).get(0);

        // Make the editor work in all browsers
        editor.contentWindow.document.open();
        editor.contentWindow.document.close();
        editor.contentWindow.document.designMode="on";

        // Set the standard fonts etc
        $(editor).contents().find("body").css({
          "word-wrap"     : "break-word",
          "font-family"   : settings.defaultFont,
          "font-size"     : settings.defaultFontSize,
          "color"         : settings.defaultFontColor
        });

        // Add some css to the iFrame
        var iFrameCSS = '<style type="text/css">body{padding: 2%;} p { margin: 0; }</style>';
        $(editor).contents().find("head").append(iFrameCSS);

        /**
        *
        *   BUTTON ACTIONS:
        *   The click actions on the buttons will be handled here
        **/

        // Create the click event
        $("." + settings.buttonsClass + " a").live("click", function() {
            // Get the command
            var command = $(this).attr("data-command");

            // Focus on the contentWindow
            editor.contentWindow.focus();

            // Take an other look at the command and look for the perfect action and execute it
            runCMD( command );

            // And focus back again on the contentWindow
            editor.contentWindow.focus();
            
            return false;
        });

        var runCMD = function( cmd ) {
          // Check the command
          switch( cmd ) {
            case "image" :
              var image = prompt("URL (example: http://www.google.com): ");
              return editor.contentWindow.document.execCommand( "InsertImage", false, image);
            case "link" :
              var link = prompt("URL (example: http://www.google.com): ");
              return editor.contentWindow.document.execCommand( "CreateLink", false, link);
            default :
              return editor.contentWindow.document.execCommand( cmd );
          }
        };

        /**
        *
        *   BUTTONS:
        *   This is the part where the buttons are setup
        **/

        // Create a function that loops through the elements that are needed
        var createBtn = function( btn ) {
          
          // Create a button
          $("<a />")
                  .addClass( btn.command )
                  .text( btn.content )
                  .attr( "data-command", btn.command )
                  .appendTo( buttons );
        };

        // Build the buttons and add before the container
        var buttons = $("<div />").addClass( settings.buttonsClass ).css({
          "float"   : "left",
          "width"   : settings.width
        }).prependTo( container );

        // Build an array with all the buttons that has to be created
        // This data is stored into defaultActions
        var defaultOptions = settings.defaultActions.split(/, ?/);
        for( i = 0; i < defaultOptions.length; i++ ) {
          
          // Create a variable to store the object in
          var button;

          // Get the right value
          switch( defaultOptions[i] ) {
            case "bold" :
              button = { content : "b", command : "bold" };
            break;
            case "underline" :
              button = { content : "u", command : "underline" };
            break;
            case "italic" :
              button = { content : "i", command : "italic" };
            break;
            case "strikethrough" :
              button = { content : "s", command : "strikethrough" };
            break;
            case "align-left" :
              button = { content : "left", command : "JustifyLeft" };
            break;
            case "align-center" :
              button = { content : "center", command : "JustifyCenter" };
            break;
            case "align-right" :
              button = { content : "right", command : "JustifyRight" };
            break;
            case "unorderd-list" :
              button = { content : "ul", command : "InsertUnorderedList" };
            break;
            case "ordered-list" :
              button = { content : "ol", command : "InsertOrderedList" };
            break;
            case "image" :
              button = { content : "img", command : "image" };
            break;
            case "link" :
              button = { content : "link", command : "link" };
            break;
            default :
              button = { content : "", command : "" };
          }

          // Create the button
          createBtn( button );
        }

        /**
        *
        *   Previous text:
        *   When the pages are loaded, the text is likely to be loaded in the textarea instead of the text editor,
        *   because the text editor is loaded later on.
        *
        *   This functionality loads the text of the textarea into the text editor, if available.
        *
        **/

        // Grap the content of the textarea
        var content = that.text();

        // Put the content of the textarea into the editor
        $(editor).contents().find("body").append(content);

        /**
        *
        *   Clean and submit
        *   While typing and editing, the browsers insert some crappy HTML, so we're gonna remove that
        *   if the submit event will be triggered. You can turn this option off by setting the cleanOnSubmit to false
        *
        *   "cleanOnSubmit" = false
        *
        **/
        var cleanCode = function() {
          var body = $(editor).contents().find("body");

          // Loop through each div tag and change it to a p tag
          body.find("div").each( function() {
            // Get the class if avaiable
            var hasStyle = ( $(this).attr("style") ) ? true : false;

            // Check or a element is not wrapped
            if( $(this).parent("p").not("p") ) {
              
              // Change the div elements to normal p tags
              if( hasStyle ) {
                // Wrap the content into p tags with the style
                $(this).wrap("<p style=\"" + $(this).attr('style') + "\"></p>");
              } else {
                // Wrap the content into p tags
                $(this).wrap("<p></p>");
              }
            }

            // Un wrap all the div tags
            $(this).contents().unwrap();
          });

          // Unwrap all br tags and remove the ugly div tags
          body.find("br").unwrap();

          /**
          *
          *   First line:
          *
          *   The browser do not put a p tag around the first line of text,
          *   but we do want a p tag around the first line of text. This adds
          *   a p tag around the first line.
          *
          */

          // Find the first line
          var firstLine = body.contents()[0];

          // Check or the first line has a p tag surrounding it
          if( body.find(firstLine).not("p") ) {
            // The first line does not have a p tag
            body.find(firstLine).wrap("p");
          }
        };

        /**
        *
        *   Submit event:
        *   When the form submits, the data of the iframe has to put in
        *   the textarea to get it posted
        *
        */

        $("#" + settings.formID).submit( function() {

          // Check or the post has to be clean
          if( settings.cleanOnSubmit ) {
            cleanCode();
          }

          // Grap the content of the iframe
          var postData = $(editor).contents().find("body").html();

          // Add the data to the textarea, where this plugin is attached too
          that.html(postData);
        });

      });
  };
})( jQuery );