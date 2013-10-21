module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON("yellow-text.jquery.json"),

    // Banner definitions
    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *  <%= pkg.homepage %>\n" +
        " *\n" +
        " *  Made by <%= pkg.author.name %>\n" +
        " *  Under <%= pkg.licenses[0].type %> License\n" +
        " */\n"
    },

    // Concat definitions
    concat: {
      dist: {
        src: ["src/yellow-text.js"],
        dest: "dist/yellow-text.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // Lint definitions
    jshint: {
      files: ["src/yellow-text.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Minify definitions
    uglify: {
      my_target: {
        src: ["dist/yellow-text.js"],
        dest: "dist/yellow-text.min.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // CoffeeScript compilation
    coffee: {
      compile: {
        files: {
          "src/yellow-text.js": "src/yellow-text.coffee",
          "spec/spec-test.js": "spec/*.coffee"
        }
      }
    },

    // Watch the project folder and start the tasks
    watch: {
      files: ["src/*.js", "src/*.coffee", "spec/*.coffee"],
      tasks: ["default"]
    },

    // Jasmine testing framework
    jasmine: {
      src: ["src/*.js"],
      options: {
        specs: "spec/*.js",
        vendor: "http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js",
        keepRunner: true
      }
    }

  });
  
  // Load the grunt tasks
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Register the tasks
  grunt.registerTask("default", ["test", "compile"]);
  grunt.registerTask("test", ["coffee", "jasmine"]);
  grunt.registerTask("compile", ["jshint", "concat", "uglify"]);  
};
