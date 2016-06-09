module.exports = function(grunt) {


  grunt.initConfig({

    uglify: {
       options: {
        mangle: false,
        expand: true,
       },
         
      build: {
        files: {
          'js/controllers.min.js': ['js/angular/app.js','js/angular/**/controller/*.js'],
          'js/services.min.js': ['js/angular/webservice.js','js/angular/**/services/*.js'],
           
           
        }
      },

    },
    htmlmin: {                                     // Task
        dist: {                                      // Target
          options: {                                 // Target options
              collapseBooleanAttributes:      true,
              collapseWhitespace:             true,
              removeAttributeQuotes:          false,
              removeComments:                 true, // Only if you don't use comment directives!
              removeEmptyAttributes:          true,
              removeRedundantAttributes:      true,
              removeScriptTypeAttributes:     false,
              removeStyleLinkTypeAttributes:  false
          },
          expand: true, 
          cwd: 'js/angular/',      // Src matches are relative to this path.
          src: ['**/*.html'], // Actual pattern(s) to match.
          dest: 'templates/',   // Destination path prefix.
          ext: '.html',   // Dest filepaths will have this extension.
          extDot: 'first'

        },
       
      }
  });
//boootstraptour
 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-uncss');

 grunt.loadNpmTasks('grunt-contrib-cssmin');
 grunt.loadNpmTasks('grunt-contrib-htmlmin');

};