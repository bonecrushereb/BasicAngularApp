const gulp = require('gulp');
const eslint = require('gulp-eslint');
const exec = require('child_process').exec;
const protractor = require('gulp-protractor').protractor;
const webpack = require('webpack-stream');


const files = ['*.js', './app'];

gulp.task('lint:dev', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' }
        ]
      },
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('protractor', () => {
  return gulp.src('./src/tests/*.js')
    .pipe(protractor({
      configFile: 'test/integration/config.js',
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', (e) => {
      throw e;
    });
});

gulp.task('test', () => {
  exec('node server.js', () => {
  });
  exec('webdriver-manager start', () => {
  });
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'lint:dev', 'protractor', 'test']);
gulp.task('default', ['build:dev']);
