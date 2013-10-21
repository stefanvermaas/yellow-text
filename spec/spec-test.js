(function() {
  describe("Yellow Text", function() {
    beforeEach(function() {
      $("body").append("<textarea class=\"js-text-editor\" />");
      return this.editor = $(".js-text-editor").yellowtext();
    });
    afterEach(function() {
      return $("body .js-text-editor").remove();
    });
    it("should have the $ object available", function() {
      return expect($).not.toBe("undefined");
    });
    it("should be added to the DOM", function() {
      return expect(this.editor).not.toBe("undefined");
    });
    it("should have three instances of the plugin", function() {
      return expect(this.editor.length).toBe(1);
    });
    return describe("available plugin options", function() {});
  });

}).call(this);
