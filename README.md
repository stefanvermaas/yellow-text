## Yellow Text
Editing text should be a pain. It should be simple. It should be pretty. With Yellow Text it is. 

This lightweight jQuery plugin ( minified it's just 4.5kb !!! ) can be used to make your text editing proces a lot easier and more fun. The text editor only contains the most basic functions you need for editing text.

### Install
Using this plugin is really simple. Just download the source code from GitHub and include the jquery.texteditor-min.js ( for live websites ) or jquery.texteditor.js. You're almost good to go now!

`<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> <!-- include jquery -->
<script type="text/javascript" src="javascripts/jquery.texteditor-min.js"></script> <!-- include the texteditor script -->`

The only thing we need to do now is call the plugin to see the text editor shine.

`$("#js-your-html-element").texteditor();`

Almost there! 

Don't forget to give the plugin the ID of your form, so we can give you clean code.

`$("#js-your-html-element").texteditor({ formID: "my-form-id" })`

And finished! Wasn't that hard huh?!

### Theme
You'll see that the plugin ships with a simple, but beautiful theme, that's build with [SASS](http://sass-lang.com/) and [Compass](http://compass-style.org/). If you're not already familiar with SASS and Compass, you should definitly check out their capabilities.

But don't be afraid. Even if you don't know anything about SASS and Compass, the plugin is just really ease to install, because you can use the standard CSS stylesheets too ( those are included in the stylesheets folder ).

Feel free to extend the theme or build your own.

### Beer-ware license
[Stefan](http://www.stefanvermaas.nl) wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.

