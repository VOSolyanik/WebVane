var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  csslint = require('gulp-csslint'),
  webserver = require('gulp-webserver');

gulp.task('cssConcat', function() {
  gulp.src('./src/css/*.css')
    .pipe(plumber())
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(autoprefixer())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('cssMin', function() {
  gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jsConcat', function() {
  gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jsMin', function() {
  gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compressImages', function() {
  gulp.src('./src/img/*.*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/img'));
});


gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('build', ['cssMin', 'jsMin', 'compressImages']);

gulp.task('watch', function() {
  gulp.watch('./src/css/*.css', ['cssConcat']);
  gulp.watch('./src/js/*.js', ['jsConcat']);
});

gulp.task('default', ['cssConcat', 'jsConcat', 'watch', 'webserver']);