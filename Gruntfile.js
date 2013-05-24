module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Define Jasmine task options.
    jasmine: {
      src: 'yellow-text-<%= pkg.version %>.js',
      options: {
        outfile: 'specs.html',
        specs: 'test/yellow-text-<%= pkg.version %>.spec.js'
      }
    },

    // Define Watch task options.
    watch: {
      scripts: {
        files: 'yellow-text-<%= pkg.version %>.js',
        tasks: 'default'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', [ 'jasmine' ]);
};