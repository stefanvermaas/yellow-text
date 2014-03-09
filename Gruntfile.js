module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt
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
      files: "src/yellow-text.js",
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Minify definitions
    uglify: {
      my_target: {
        files: {
          "dist/yellow-text.min.js": "dist/yellow-text.js"
        }
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // grunt-watch will monitor the projects files
    watch: {
      all: {
        files: ["src/*.js"],
        tasks: ["default"],
        options: {
          livereload: true
        }
      }
    },

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 4000,
          hostname: "0.0.0.0",
          bases: ['demo', 'dist'],
          livereload: true
        }
      }
    },
  });

  grunt.registerTask("default", ["jshint", "concat", "uglify"]);
  grunt.registerTask("server", ["express", "watch"])
};