const gulp = require('gulp');
const sass = require('gulp-sass');
const glob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

/* SASS Option */
const option = {
  /*
  outputStyle: 'expanded',
  /*/
  outputStyle: 'compressed',
  //*/
  includePaths: [''],
};

/* TASKS */
gulp.task('sass', () => gulp.src('./scss/*.scss')
  .pipe(glob())
  .pipe(sass(option))
  .pipe(gulp.dest('./dist'))
  .pipe(reload({ stream: true }))
);

// page
const nunjucks = require('gulp-nunjucks-render');
const manageEnvironment = (environment) => {
  environment.addGlobal('merge', () => {
    'use strict';
    if (arguments.length < 2) {
      return {};
    } else {
      const obj = {};
      for (let i = 0, len = arguments.length; i < len; i++) {
        for (let key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            obj[key] = arguments[i][key];
          }
        }
      }
      return obj;
    }
  });

  environment.addGlobal('load', (path) => {
    'use strict';
    if (fs.lstatSync(path)) {
      return fs.readFileSync(path, 'utf8').replace(/[\n]?{%[^}]*}[\n]?/g, '');
    }
  });

  environment.addGlobal('render', (markup) => {
    Vue.config.debug = false;
    Vue.config.productionTip = true;
    renderer.renderToString(new Vue({
      template: markup,
    }), function (err, rendered) {
      if (err) {
        markup = error(err);
        //throw err;
      } else {
        markup = beautify.html(correction(rendered), {
          indent_size: 2,
          unformatted: ['pre', 'code', 'xmp'],
          indent_inner_html: true,
        });
      }
    });

    return markup;
  });
};
gulp.task('render', () => gulp.src(['develop/**/*.html'])
  .pipe(nunjucks({
    manageEnv: manageEnvironment,
  }))
  .pipe(gulp.dest('./'))
  .pipe(reload({ stream: true }))
);

gulp.task('watch', () => {
    gulp.watch('scss/**/*.scss', { cwd: './' }, ['sass']);
    gulp.watch('develop/**/*.html', { cwd: './' }, ['render']);
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
gulp.task('default', ['sass', 'watch', 'browser-sync']);
