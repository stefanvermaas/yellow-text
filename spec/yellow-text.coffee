describe "Yellow Text", ->

  # Add the textarea to the DOM
  beforeEach ->
    $("body").append( "<textarea class=\"js-text-editor\" />" )

    # Bind the jQuery plugin to the textarea
    @editor = $(".js-text-editor").yellowtext()

  # Remove the textarea from the DOM
  afterEach ->    
    $("body .js-text-editor").remove()

  # First we add some DOM tests
  it "should have the $ object available", ->
    expect($).not.toBe "undefined"

  it "should be added to the DOM", ->
    expect(@editor).not.toBe "undefined"

  it "should have three instances of the plugin", ->
    expect(@editor.length).toBe 1

  describe "available plugin options", ->
