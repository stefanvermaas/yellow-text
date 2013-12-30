describe("Yellow Text", function() {

  // - jQuery tests ---------------------------------------------- /
  describe("jQUery", function() {
    it("has access to jQuery", function() {
      expect($).not.toBe("undefined");
    });
  });

  // - Initialization tests ---------------------------------------------- /
  describe("Initialization", function() {

    // Attach the plugin to the textarea
    beforeEach(function() {

      // Create an textarea and attach the plugin to it
      this.$textarea = $('<textarea class="js-textarea" />').appendTo('body');
      this.$textarea.yellowtext();

      // Define the editor, by looking for it
      this.$editor = $('.js-yellow-text-editor');
    });

    afterEach(function() {

      // Remove any reference to the plugin and textarea
      this.$textarea.remove();
      this.$editor.remove();
    });

    it("has hidden the textarea", function() {
      expect(this.$textarea.is(":hidden")).toBe(true);
    });

    it("has initialized the container div", function() {
      expect(this.$editor.length).toBe(1);
    });

    it("has the height of 350px", function() {
      expect(this.$editor.height()).toBe(350);
    });

    it("has the property: contenteditable", function() {
      expect(this.$editor.attr("contenteditable")).toBe("true");
    });

    it("has additional content", function() {

      // Remove the old textarea and editor
      this.$textarea.remove();
      this.$editor.remove();

      // Create an textarea with content
      this.$textarea = $('<textarea class="js-textarea" />').appendTo('body');

      // Create some content
      var textLine = "This is a textline";
      this.$textarea.val( textLine );

      // Initialize the editor
      this.$textarea.yellowtext();

      // Define the editor, by looking for it
      this.$editor = $('.js-yellow-text-editor');

      // Check or it has some content
      expect( this.$editor.html() ).toBe( textLine );
    });

  });

  // - Settings tests ---------------------------------------------- /
  describe("Settings", function() {

    // Attach the plugin to the textarea
    beforeEach(function() {

      // Create an textarea and attach the plugin to it
      this.$textarea = $('<textarea class="js-textarea" />').appendTo('body');
    });

    // Remove any reference to the plugin and textarea
    afterEach(function() {
      this.$textarea.remove();
    });

    it("is possible to change the default height", function() {

      // Initialize the text editor with a width of 500px instead of the default 350
      this.$textarea.yellowtext({
        height: 500
      });

      var editor = $('.js-yellow-text-editor');
      expect( editor.height() ).toBe(500);
      editor.remove();
    });

    it("is possible to change the default width", function() {

      // Initialize the text editor with a width of 500px instead of the default 350
      this.$textarea.yellowtext({
        width: 250,
        widthType: "px"
      });

      var editor = $('.js-yellow-text-editor');
      expect( editor.width() ).toBe(250);
      editor.remove();
    });

    it("is possible to change the default container name", function() {

      // Initialize the text editor with a width of 500px instead of the default 350
      this.$textarea.yellowtext({
        container: 'special-class'
      });

      var editor = $('.special-class');
      expect( editor ).not.toBe("undefined");
      editor.remove();
    });

  });

});
