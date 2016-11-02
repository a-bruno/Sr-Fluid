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
var svgSprite = require('gulp-svg-sprite');

var paths = {

	default: {
		root: '.',
		file: 'scss/style.scss',
		scss: 'scss',
		css: 'css',
		svg: 'svg'
	}

};

var configSVG = {
	shape: {
        dimension: {
            maxWidth: 62,
            maxHeight: 62
        }
	},
	mode: {
		symbol: {
			dest: 'svg',
			sprite: 'symbols.svg',
			example: true
		},
		svg: {
			xmlDeclaration: false,
			doctypeDeclaration: false
		}	
	}
};

gulp.task('watch', function() {
    
    gulp.watch( [paths.default.scss+'/**/*.scss'] , function(event) {
		gulpUtil.log('File '+ event.path +' was '+ event.type +', running tasks...');
		gulp.start('compass');
    });


    gulp.watch( [paths.default.svg+'/**/*.svg'] , function(event) {
    	gulpUtil.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    	gulp.start('svg-sprites');
    });

});

gulp.task('compass', function() {
	gulp.src(paths.default.file)
	.pipe(compass({
		css: paths.default.css,
		sass: paths.default.scss,
		comments: false,
		//style: 'compressed',
		require: ['susy', 'breakpoint'],
		sourcemap: true
	}))
	//.pipe(minifyCSS())
	.pipe(gulp.dest(paths.default.css))
	.pipe(notify('Compilado com sucesso!'));
});

gulp.task('svg-sprites', function(){
    return gulp.src(paths.default.svg+'/**/*.svg')
		.pipe(svgSprite(configSVG))
	    .pipe(gulp.dest('.'))
});

