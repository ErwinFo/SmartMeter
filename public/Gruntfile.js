
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scripts: {
				files: ['<%= jshint.files %>'],
				tasks: [
					'jshint',
					'concat:dist'
				]
			}
		},

		jshint: {
			files: ['app/*.js'],
			options: {
				globals: {
					console: true,
					module: true,
                    this: true
				}
			}
		},

		concat: {
			dist: {
				src: [
					'app/*.js'
				],
				dest: 'dist/smartmeter.js'
			}
		},

		uglify: {
			dist: {
				files: {
					'dist/smatermeter.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', [
		'jshint',
		'concat:dist',
		'uglify'
	]);

	// default task
	grunt.registerTask('default', [
       'jshint',
       'concat:dist',
       'watch'
	]);
};
