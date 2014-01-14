module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> Copyright (c) <%= grunt.template.today("yyyy-mm-dd") %> Markit On Demand, Inc. Licensed under the Apache License 2.0. */\n'
      },
      build: {
        src: 'cachey.js',
        dest: 'dist/cachey.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('docco', 'Runs docco', function() {
     var done = this.async(),
      log = grunt.log.write('Generating spec documentation...');
      grunt.util.spawn(
      {
         cmd: 'docco',
         args: [
          'cachey.js',
          '-o', '../cachey.js-pages'
        ],
         opts: { }
      },
      function(error, result, code) {
         if (error) {
          grunt.fail.fatal(error);
         } else {
          log.ok();
          done();
         }
      }
      );
  });
  grunt.registerTask('default', ['uglify','docco']);
};