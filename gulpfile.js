var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require("gulp-notify"),
	pug 		  = require('gulp-pug'),
	rsync         = require('gulp-rsync'),
	imgMin		  = require('gulp-imagemin'),
	cache		  = require('gulp-cache'),
	imgPng		  = require('imagemin-pngquant');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});



gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src(['app/libs/jquery/dist/jquery.min.js','app/libs/addons/**/*.js','app/js/common.js'])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function buildHTML() {
  return gulp.src('app/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('app'))
	.pipe(browserSync.reload({ stream: true }));
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('img',function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imgMin({
		interlaced:true,
		progressive:true,
		svgoPlugins:[{removeViewBox:false}],
		une:[imgPng()]
	})))
	.pipe(gulp.dest('dist/img'));
});



gulp.task('watch', ['styles', 'js', 'html', 'browser-sync'], function() {
	gulp.watch('app/pug/**/*.pug', ['html']);
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('build',['html','styles','img', 'js', 'browser-sync'],function(){
	var buildCss = gulp.src('app/css/main.min.css')
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJS = gulp.src(['app/**/*.js', 'app/js/bootstrap.min.js', 'app/js/common.js'], ['js'])
	.pipe(gulp.dest('dist/'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);

	// return gulp.src([
	// 	'app/libs/jquery/dist/jquery.min.js',
	// 	'app/libs/slick.min.js',
	// 	// 'app/libs/parallax.min.js',
	// 	'app/libs/owl.carousel.min.js',
	// 	// 'app/libs/jquery.ckLine.min.js',
	// 	'app/js/common.js', // Always at the end
	// 	])