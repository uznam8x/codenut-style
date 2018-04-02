const gulp = require('gulp');
const sass = require('gulp-sass');
const glob = require('gulp-sass-glob');

/* SASS Option */
const option = {
  //*
  outputStyle: 'expanded',
  /*/
  outputStyle: 'compressed',
  //*/
  includePaths: [''],
};

/* TASKS */
gulp.task('scss', () => gulp.src('./scss/*.scss')
  .pipe(glob())
  .pipe(sass(option).on('error', sass.logError))
  .pipe(gulp.dest('./dist'))
);