var replaceSnippet = require('./snippets').replaceSnippet;

module.exports = function(grunt) {

	grunt.initConfig({
		pkgs: grunt.file.readJSON('package.json'),
		clean: {
			options: { force: true},
			build: ['../posts', '../img']
		},
		less: {
			dev: {
				files: {
					"../style.css": "../src/app/style/less/style.less"
				}
			},
			build: {
				options: {
					yuicompress: true
				},
				files: {
					"../style.css": "../src/app/style/less/style.less"
				}
			}
		},
		concat: {
			all: {
				src: '../src/app/scripts/**/*.js',
				dest: '../scripts.js'
			}
		},
		uglify: {
			build: {
				src: ['../scripts.js'],
				dest: '../scripts.js'
			}
		},
		copy: {
			style: {
				files: [{expand: true, cwd: '../src/app/style/img', src:['**'], dest:'../img/'}]
			},
			posts: {
				files: [{expand: true, cwd: '../src/img/', src:['**'], dest: '../img/'}]
			}
		},
		markdown: {
			options: {
				author: "iaarchiver",
				title: "notions:iaarchiver",
				description: "blog where I write notions",
				url: "http://iaarchiver.github.io",
				disqus: 'iaarchiver',
				rssCount: 10,
				dateFormat: 'MMMM Do YYYY',
				layouts:{
					wrapper: "../src/app/templates/wrapper.us",
					index: "../src/app/templates/index.us",
					post: "../src/app/templates/post.us",
					archive: "../src/app/templates/archive.us"
				},
				paths: {
					posts: "../src/posts/*.md",
					index: "index.html",
					archive: "archive.html",
					rss: "index.xml"
					}
			},
			build: {
				dest: '../', 
				context: {
					js: "/scripts.js",
					css: "/style.css"
				}
			}
		},
		connect: {
			options :{
				port: 3000,
				hostname: '*',
				base: '../',
				middleware: function (connect, options) {
					return [
						replaceSnippet, // replace HTML for liveReload
						connect.static(require('path').resolve(options.base))
					];
				}
			},
			dev: {

			}
		},
		watch: {
			options: {
				livereload: true,
				nospawn: true
			},
			less : {
				files : ['../src/app/style/less/**/*.less'],
				tasks : ['less']
			},
			js: {
				files: ['../src/app/scripts/**/*.js'],
				tasks: ['concat', 'uglify']
			},
			img: {
				files: ['../src/app/style/img/**/*', '../src/img/**/*'],
				tasks: ['copy']
			},
			markdown: {
				files: ['../src/posts/*.md','../src/app/templates/*.us'],
				tasks: ['markdown']
			}
		}
	});

	// load grunt-* packages
	for(var task in grunt.config.data.pkgs.devDependencies){
		if( task.substring(0,6) == 'grunt-'){
			grunt.loadNpmTasks(task);
		}
	}

	// set default tasks
	grunt.registerTask('build',['clean', 'less:build', 'concat', 'uglify', 'copy','markdown','connect','watch']);
	grunt.registerTask('dev',['clean', 'less:dev', 'concat', 'copy', 'markdown','connect','watch']);
};
