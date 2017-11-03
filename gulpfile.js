const gulp = require('gulp');
const sass = require('gulp-sass');
const glob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
/* SASS Option */
const option = {
  //*
  outputStyle: 'expanded',
  /*/
  outputStyle :"compressed",
  //*/
  includePaths: ['scss/'],
};

/* TASKS */
gulp.task('sass', () => gulp.src('./scss/style.scss')
  .pipe(glob())
  .pipe(sass(option))
  .pipe(gulp.dest('./dist/css'))
  .pipe(reload({ stream: true }))
);

gulp.task('watch', () => {
    gulp.watch('scss/**/*.scss', { cwd: './' }, ['sass']);
  }
);

gulp.task('browser-sync', () => {
  browserSync.init({
    port: 3400,
    server: {
      baseDir: './',
    },
  });
});

gulp.task('default', ['sass']);
