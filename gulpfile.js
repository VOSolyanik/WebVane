var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
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
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('cssMin',['cssIE'], function() {
  gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('cssIE', function() {
  gulp.src('./src/css/ie/*.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('jsConcat', function() {
  gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('jsMin', function() {
  gulp.src('./src/js/*.js')
    .pipe(uglify())
    // .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('compressImages', function() {
  gulp.src('./src/img/*.*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', function() {
  gulp.src('./src/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts'));
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
  gulp.watch('./src/fonts/*.*', ['fonts']);
  gulp.watch('./src/img/*.*', ['compressImages']);
});

gulp.task('default', ['fonts', 'compressImages', 'cssConcat', 'cssIE', 'jsMin', 'watch', 'webserver']);