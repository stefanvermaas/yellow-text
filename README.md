# Yellow Text

Editing text shouldn't be a pain. It should be simple. It should be pretty. With Yellow Text it is.

[![Stories in Ready](https://badge.waffle.io/stefanvermaas/yellow-text.png?label=ready)](https://waffle.io/stefanvermaas/yellow-text)

![image](http://f.cl.ly/items/3A1s071l1H0M1c34210k/Schermafbeelding%202013-01-16%20om%2019.02.11.png)

This lightweight jQuery plugin can be used to make your text-editing proces a lot easier and more fun. The text editor only contains the most basic functions you need for editing text.

* [Install](#install)
* [Callbacks](#callbacks)
  + [setImage](#setimage)
  + [isContentChanged](#iscontentchanged)
* [Theme](#theme)
* [Beer-ware license](#beer-ware-license)

## Install

**Step 1:** Download the source code from GitHub and include `jquery.texteditor-min.js` (for live websites) or `jquery.texteditor.js` (for local websites). 

```javascript
<!-- include jQuery -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<!-- include the texteditor script -->
<script type="text/javascript" src="javascripts/jquery.texteditor-min.js"></script>
```

**Step 2:** Make sure you call the plugin by its name.

```javascript
$("#js-your-html-element").YellowText();
```

**Step 3:** Annnnnnnnnnd... finished! Give yourself a high five!

## Callbacks

Yellow Text 0.3 introduces two new callback functions: [`setImage`](#setimage) and [`isContentChanged`](#iscontentchanged).

### setImage

This function makes it possible to use another jQuery JavaScript plugin to upload or insert an image to the text editor.

Example:

```javascript
$(function() {
    $("#js-textarea").YellowText({
        setImage: function() {

            // Grap the image
            var image = "http://link.com";

            // Return the image back to Yellow Text
            return image;           
        }
    });
});
```

Just make sure you return the image you've just uploaded, and it will be all fine!

### isContentChanged

Want to know if your content has changed so you can do fancy stuff with it, such as enabling or disabling your save button? Just listen to this callback, and it will give you the right information.

The function has one single parameter, which is a `Boolean`. 

Example:

```javascript
$(function() {
    $("#js-textarea").YellowText({
      isContentChanged: function( changed ) {
        
        // Check or the content is changed
        var changes = ( changed === true ) ? "content is changed" : "content hasn't changed";
        
        // Log the changes
        console.log( changes );       
      }
    });
});
```

## Theme

The plugin ships with a simple, elegant theme built with [SASS](http://sass-lang.com/) and [Compass](http://compass-style.org/). If you're not already familiar with SASS and Compass, you should definitely check them out.

But don't be afraid. Even if you don't know anything about SASS and Compass, the plugin is just as easy to install, because you can use the standard CSS stylesheets too (those are included in the `stylesheets` folder).

Feel free to extend the theme or build your own. 

***Enjoy writing***

## Beer-ware license
As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
