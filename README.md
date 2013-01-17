![image](http://f.cl.ly/items/3A1s071l1H0M1c34210k/Schermafbeelding%202013-01-16%20om%2019.02.11.png)

Editing text shouldn't be a pain. It should be simple. It should be pretty. With Yellow Text it is. 

This lightweight jQuery plugin ( minified it's just 4.5kb !!! ) can be used to make your text editing proces a lot easier and more fun. The text editor only contains the most basic functions you need for editing text.

### Install
**Step 1:** Using this plugin is really simple. Just download the source code from GitHub and include the jquery.texteditor-min.js ( for live websites ) or jquery.texteditor.js. You're almost good to go now!

`<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script> <!-- include jquery -->`

`<script type="text/javascript" src="javascripts/jquery.texteditor-min.js"></script> <!-- include the texteditor script -->`

**Step 2:** 
Make sure the form ID is correct to make sure the plugin will listen to the right form.

`$("#js-your-html-element").texteditor({ formID: "my-form-id" })`

**Step 3:** The only thing we need to do now is call the plugin to see the text editor shine.

`$("#js-your-html-element").texteditor();`

**Step 4:** And finished! Wasn't that hard huh?!

### Theme
You'll see that the plugin ships with a simple, but beautiful theme, that's build with [SASS](http://sass-lang.com/) and [Compass](http://compass-style.org/). If you're not already familiar with SASS and Compass, you should definitly check it out.

But don't be afraid. Even if you don't know anything about SASS and Compass, the plugin is just as easy to install, because you can use the standard CSS stylesheets too ( those are included in the stylesheets folder ).

Feel free to extend the theme or build your own. 

***Enjoy writing***

### Beer-ware license
[Stefan](http://www.stefanvermaas.nl) wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.

### Changelog
- v0.1: Very raw first version of the plugin
- v0.2: First stable version of the plugin. Rebuild v0.1 from the ground to make it more robust.