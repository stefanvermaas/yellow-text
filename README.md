[![Stories in Ready](https://badge.waffle.io/stefanvermaas/yellow-text.png?label=ready)](https://waffle.io/stefanvermaas/yellow-text)
![image](http://f.cl.ly/items/3A1s071l1H0M1c34210k/Schermafbeelding%202013-01-16%20om%2019.02.11.png)

Editing text shouldn't be a pain. It should be simple. It should be pretty. With Yellow Text it is. 

This lightweight jQuery plugin can be used to make your text editing proces a lot easier and more fun. The text editor only contains the most basic functions you need for editing text.

## Install
**Step 1:** Using this plugin is really simple. Just download the source code from GitHub and include the jquery.texteditor-min.js ( for live websites ) or jquery.texteditor.js ( for local websites ). 

```javascript
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> <!-- include jquery -->
<script type="text/javascript" src="javascripts/jquery.texteditor-min.js"></script> <!-- include the texteditor script -->
```

**Step 2:** 
Make sure you call the plugin by it's name

```javascript
$("#js-your-html-element").YellowText();
```

**Step 3:** Annnnnnnnnnd... finished! Wasn't that hard huh?!

## Callbacks
In v0.3 are two new callback functions introduced. The're called: setImage and isContentChanged.

### setImage
This function makes it possible to use an other jQuery / javasscript plugin to upload or insert an image to the text editor. Using this callback is easy:

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

Just make sure you return the image, you've just uploaded, and it will be all fine!

### isContentChanged
Want to know or your content is changed, so you can do fancy stuff with it like enable or disable your save button? Just listen to this callback and it will give you the right informatie.

The function has one single parameter, which is a boolean, that can be used like this;

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
You'll see that the plugin ships with a simple, but beautiful theme, that's build with [SASS](http://sass-lang.com/) and [Compass](http://compass-style.org/). If you're not already familiar with SASS and Compass, you should definitly check it out.

But don't be afraid. Even if you don't know anything about SASS and Compass, the plugin is just as easy to install, because you can use the standard CSS stylesheets too ( those are included in the stylesheets folder ).

Feel free to extend the theme or build your own. 

***Enjoy writing***

## Beer-ware license
As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
