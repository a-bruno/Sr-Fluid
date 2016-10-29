var pkg = require('./package.json');
var gulp = require('gulp');
var compass = require('gulp-compass');
var nodeSass = require('node-sass');
var sassLoader = require('sass-loader');
//var susy = require('susy');
var webpack = require('webpack');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var path = require('path');
var concat = require('gulp-concat'); 
var notify = require('gulp-notify');
var glob = require('glob');
var gulpUtil = require('gulp-util');

var paths = {

	default: {
		root: '.',
		file: 'scss/style.scss',
		scss: 'scss',
		css: 'css',
		img: '',
		svg: ''
	}

};

gulp.task('watch', function() {
    
    gulp.watch( [paths.default.scss+'/**/*.scss'] , function(event) {
		gulpUtil.log('File '+ event.path +' was '+ event.type +', running tasks...');
		gulp.start('compass');
    });

});

gulp.task('compass', function() {
	gulp.src(paths.default.file)
	.pipe(compass({
		css: paths.default.css,
		sass: paths.default.scss,
		comments: false,
		style: 'compressed',
		require: ['susy', 'breakpoint'],
		sourcemap: true
	}))
	.pipe(minifyCSS())
	.pipe(gulp.dest(paths.default.css))
	.pipe(notify('Compilado com sucesso!'));
});

