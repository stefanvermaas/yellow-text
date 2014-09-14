module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON('yellowtext.jquery.json'),

    // Banner definitions
    meta: {
      banner: '/*\n' +
        ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  Made by <%= pkg.author.name %>\n' +
        ' *  Under <%= pkg.licenses[0].type %> License\n' +
        ' */\n'
    },

    // Concat definitions
    concat: {
      dist: {
        src: ['src/jquery.yellowtext.js'],
        dest: 'dist/jquery.yellowtext.js'
      },
      options: {
        banner: '<%= meta.banner %>'
      }
    },

    // Lint definitions
    jshint: {
      files: ['src/jquery.yellowtext.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Minify definitions
    uglify: {
      my_target: {
        src: ['dist/jquery.yellowtext.js'],
        dest: 'dist/jquery.yellowtext.min.js'
      },
      options: {
        banner: '<%= meta.banner %>'
      }
    },

    // Watch definitions
    watch: {
      src: {
        files: ['src/jquery.yellowtext.js'],
        tasks: ['compile'],
        options: {
          livereload: true
        }
      },

      config: {
        files: ['Gruntfile.js', '.jshintrc'],
        options: {
          reload: true
        }
      }
    },

    // Connect definitions
    connect: {
      server: {
        options: {
          port: 4000,
          keepalive: true,
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['watch'])
  grunt.registerTask('serve',   ['connect'])
  grunt.registerTask('compile', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('travis',  ['jshint']);

};
