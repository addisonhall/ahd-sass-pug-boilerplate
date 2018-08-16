/*
* Gulpfile for SASS stuff
*/

// include gulp and required node modules
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    cleancss = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jsuglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect');

// compile pug
gulp.task('pug', function () {
	gulp.src('./src/pug/templates/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('./dist/'))
		.pipe(connect.reload());
});

// compile sass
gulp.task('sass', function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['node_modules/bootstrap/scss/', 'node_modules/bootstrap/dist/css/']}))
        .pipe(cleancss())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('./dist/assets/css/'))
        .pipe(connect.reload());
});

// compile js
gulp.task('js', function () {
	gulp.src([
            './src/js/scripts.js'
        ])
		.pipe(concat('scripts.js'))
		.pipe(jsuglify())
		.on('error', gutil.log)
		.pipe(gulp.dest('./dist/assets/js/'))
		.pipe(connect.reload());
});

// process images
gulp.task('images', function() {
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/img/'))
});

// live reload
gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

// watch these files (removed './' because of gaze bug?)
gulp.task('watch', function () {
    gulp.watch(['src/pug/templates/**/*.pug', 'src/pug/layouts/*.pug', 'src/pug/includes/*.pug'], ['pug']);
    gulp.watch(['src/scss/**/*.scss'], ['sass']);
	gulp.watch(['src/js/*.js'], ['js']);
});

// run default task
gulp.task('default', ['pug', 'sass', 'js', 'connect', 'watch']).on('error', gutil.log);