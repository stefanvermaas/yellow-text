/*!*
*	Yellow Text
*	=========================================
*	This plugin is created to make text editing
*	more fun and to make it easy for the editor.
*
*	Version: 0.4.2
*	Author: Stefan Vermaas
*	URL: www.stefanvermaas.nl
*
*/
(function( $ ) {

	// Define the plugin methods
	var methods = {

		// Call the initialization function
		init: function( that, options ) {

			// Create the global this element
			methods.el = that;

			/**
			*
			*	Settings
			*	=========================================
			*	This part of the plugin contains the settings
			*	that are default. Feel free to override them
			*	during intialization of the plugin.
			*
			*	For an example, see javascripts/demo.js
			*
			*/
			methods.settings = $.extend( {
				width            : '100%',
				height           : '300px',
				containerClass   : 'js-editor-container',
				buttonsClass     : 'js-editor-buttons',
				iFrameClass      : 'js-editor-iframe',
				cleanOnSubmit    : true,
				defaultFont      : 'Helvetica Neue, Helvetica, arial, sans-serief',
				defaultFontSize  : '1em',
				defaultFontColor : '#000000',
				defaultActions   : 'bold, underline, italic, strikethrough, align-left, align-center, align-right, unordered-list, ordered-list, link, image',

				// Callbacks
				isContentChanged : function() {},
				setImage         : function() {}
			}, options);

			// Render the plugin
			methods.render();

			// Grap the content and put it in the iframe
			methods.setContent();

			// Listen to events and react on them
			methods.events();
		},

		/**
		*
		*	Render
		*	=========================================
		*	This function renders the whole plugin and
		*	it's only used to build the plugin.
		*
		*/
		render: function() {

			// Render the new text editor
			methods.createTextEditor();

			// Render the buttons
			methods.createButtons();
		},

		/**
		*
		*	createTextEditor
		*	=========================================
		*	This part of the plugin builds the main
		*	elements of the new text editor
		*
		*/
		createTextEditor: function() {

			// Hide the current text field
			$(methods.el).hide();

			// Create a container which will hold or text editor
			methods.container = $('<div />').addClass( methods.settings.containerClass ).css({
				'float'   : 'left',
				'width'   : methods.settings.width,
				'border'  : '1px solid #ccc'
			});

			// Add the container after the element where we bind this plugin too
			$(methods.el).after( methods.container );

			// Create the iFrame and append to the previously created container
			methods.editor = $('<iframe />').addClass( methods.settings.iFrameClass ).css({
				'float'   : 'left',
				'width'   : methods.settings.width,
				'height'  : methods.settings.height,
				'border'  : '0',
				'overflow': 'hidden'
			}).appendTo( methods.container ).get(0);

			// Make the editor work in all browsers
			methods.editor.contentWindow.document.open();
			methods.editor.contentWindow.document.close();
			methods.editor.contentWindow.document.designMode='on';

			// Set the standard fonts etc
			$(methods.editor).contents().find('body').css({
				'word-wrap'     : 'break-word',
				'font-family'   : methods.settings.defaultFont,
				'font-size'     : methods.settings.defaultFontSize,
				'color'         : methods.settings.defaultFontColor
			});

			// Add a p tag to make sure browsers don't add div's
			$(methods.editor).contents().find('body').append('<p> </p>');

			// Add some css to the iFrame
			var iFrameCSS = '<style type="text/css">body{padding:2%;}p{margin:0;}</style>';
			$(methods.editor).contents().find('head').append(iFrameCSS);

			// Build the button container
			methods.buttons = $('<div />').addClass( methods.settings.buttonsClass ).css({
				'float'   : 'left',
				'width'   : methods.settings.width
			}).prependTo( methods.container );
		},

		/**
		*
		*	Content
		*	=========================================
		*	Graps the content from the textarea and puts
		*	it in the text editor
		*
		*/
		setContent: function() {

			// Grap the content of the textarea
			var content = $(methods.el).text();

			// Put the content of the textarea into the editor
			$( methods.editor ).contents().find('body').append(content);
		},

		/**
		*
		*	createButtons
		*	=========================================
		*	This part of the plugin build all the buttons
		*	that are defined by the user or it takes the
		*	default buttons.
		*
		*/
		createButtons: function() {

			// Define the 'to make buttons'
			var defaultOptions = methods.settings.defaultActions.split(/, ?/);

			// Loop through all the buttons
			for( i = 0; i < defaultOptions.length; i++ ) {

				// Create a variable to store the object in
				var button;

				// Get the right value
				switch( defaultOptions[i] ) {
					case 'bold' :
						button = { content : 'b', command : 'bold' };
					break;
					case 'underline' :
						button = { content : 'u', command : 'underline' };
					break;
					case 'italic' :
						button = { content : 'i', command : 'italic' };
					break;
					case 'strikethrough' :
						button = { content : 's', command : 'strikethrough' };
					break;
					case 'align-left' :
						button = { content : 'left', command : 'JustifyLeft' };
					break;
					case 'align-center' :
						button = { content : 'center', command : 'JustifyCenter' };
					break;
					case 'align-right' :
						button = { content : 'right', command : 'JustifyRight' };
					break;
					case 'unordered-list' :
						button = { content : 'ul', command : 'InsertUnorderedList' };
					break;
					case 'ordered-list' :
						button = { content : 'ol', command : 'InsertOrderedList' };
					break;
					case 'image' :
						button = { content : 'img', command : 'image' };
					break;
					case 'link' :
						button = { content : 'link', command : 'link' };
					break;
					default :
						button = { content : '', command : '' };
				}

		        // Build the buttons and add before the container
		        $('<a />').addClass( button.command ).text( button.content ).data( 'command', button.command ).appendTo( methods.buttons );
			}
		},

		/**
		*
		*	Events
		*	=========================================
		*	Listen to specific events. The events that
		*	are justed in this plugin are click, keydown
		*	and submit event
		*
		*	With the click event we can detect a click on
		*	a button to modify the text.
		*
		*	With the keydown event we can detect or the
		*	user uses shortkeys for editing text.
		*
		*/
		events: function() {

			// Bind to the click event on the buttons
			$('.' + methods.settings.buttonsClass + ' a').on('click', function(e) {

				// Get the command
				var command = $(this).data('command');

				// React on the button event
				methods.buttonClicked( e, command );

				// Check for ul or ol
				if( command === 'InsertUnorderedList' || command === 'InsertOrderedList' ) {

    				// Clean all the UL's and OL's
    				methods.cleanLists( command );
				}
			});

			// Bind to the keydown event while typing
			$( methods.editor ).contents().find('body').on('keydown', function(e) {

    			// Look for the control or command key
				if( e.ctrlKey || e.metaKey ) {
					methods.shortkey( e, this );
				}

			});

			// Bind the keyup event, to check for changes
			$( methods.editor ).contents().find('body').on('keyup', function(e) {

				// Check or the text is changed
				var changed = ( $( methods.editor ).contents().find('body').html() !== $(methods.el).text() ) ? true : false;

				// Call the callback
				methods.settings.isContentChanged( changed );
			});

			// Bind to the submit event of the form
			$( methods.el ).parents('form').on('submit', function(e) {

				// First clean the code
				methods.cleanTheCode();

				// Put the content back in the textfield
				methods.putContentBack();
			});

		},

		/**
		*
		*	buttonClicked
		*	=========================================
		*	This function reacts on the fact that a
		*	button is clicked. Based on the button an
		*	action will be triggered
		*
		*/
		buttonClicked: function( e, command ) {

			// Focus on the contentWindow
			methods.editor.contentWindow.focus();

			// Take an other look at the command and look for the perfect action and execute it
			methods.runCMD( command );

			// And focus back again on the contentWindow
			methods.editor.contentWindow.focus();
		},

		/**
		*
		*	shortkey
		*	=========================================
		*	Wanna use a shortkey? This function takes
		*	care for that. You can quickly edit the text
		*	by using those shortkeys.
		*
		*	Currently you can use cmd/ctrl + b, cmd/ctrl + i
		*	and cmd/ctrl + u to make your text bold, italic
		*	or underlined.
		*
		*/
		shortkey: function( e ) {

			// Define the key
			var key = e.which;

			// Check or we have on of the right keys
			if( key === 66 || key === 73 || key === 85 ) {

    			// Focus on the content window
    			methods.editor.contentWindow.focus();

    			// Handle the action
    			switch( key ) {
        			case 66:
        			methods.runCMD('bold');
        			break;

        			case 73:
        			methods.runCMD('italic');
        			break;

        			case 85:
        			methods.runCMD('underline');
        			break;
    			}

    			// And focus back again on the contentWindow
    			methods.editor.contentWindow.focus();
			}
		},

		/**
		*
		*	runCMD
		*	=========================================
		*	This is the real deal. This part of the
		*	script handles the actual commands and it
		*	can be used by every other function as long
		*	as it provides a command to execute.
		*
		*/
		runCMD: function( cmd ) {

	        // Check command for special actions and run it
	        if( cmd === 'image' ) {

		        // Check for the insertImage function, this will always be true
		        if( typeof methods.settings.setImage === 'function' ) {
			        var image = methods.settings.setImage.call();
		        }

		        // Check or a other plugin or CMS added an image to the plugin
		        var url = ( typeof image !== 'undefined' && image.length > 0 ) ? image : prompt('URL (example: http://www.google.com): ');

		        // Insert the image in the text editor
		        return methods.editor.contentWindow.document.execCommand( 'InsertImage', false, url);

		    } else if( cmd === 'link' ) {
			    var link = prompt('URL (example: http://www.google.com): ');
			    return methods.editor.contentWindow.document.execCommand( 'CreateLink', false, link);
			} else {
	            return methods.editor.contentWindow.document.execCommand( cmd );
            }
        },

		/**
		*
		*	cleanTheCode
		*	=========================================
		*   This part of the plugin cleans up the browser
		*   mess.
		*
		*/
		cleanTheCode: function() {

			// Unwrap all br tags and remove the ugly div tags
			$(methods.editor).contents().find('body').find('br').removeAttr('class').unwrap();

		},

		cleanLists: function( command ) {

    		// Detect the type
    		var type = ( command === 'InsertUnorderedList' ) ? 'ul' : 'ol';

    		// Remove the UL or OL
    		$(methods.editor).contents().find('body').find(type).removeAttr('class').unwrap();
		},

		/**
		*
		*	putContentBack
		*	=========================================
		*	This function is triggered on the submit
		*	event and is needed to put the content of
		*	the texteditor back in the text field
		*	where the plugin is binded too.
		*
		*/
		putContentBack: function() {
			// Grap the content of the iframe
			var postData = $(methods.editor).contents().find('body').html();

			// Make sure the textarea is empty
			$( methods.el ).val( postData );
		}
	};


	// Initialize the plugin
	$.fn.texteditor = function( method ) {

		// Make sure the text editor can bind to all the HTML elements
		return this.each( function() {

			// Check for methods
			if ( methods[method] ) {

				// Target a specific function
				return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
			} else if ( typeof method === 'object' || ! method ) {

				// No specific method is found, just initialize the plugin
				return methods.init( this, method );
			} else {

				// Method doesn't excist for this plugin
				$.error( 'Method ' +  method + ' does not exist on jQuery.texteditor' );
			}
		});

	};

})( jQuery );
