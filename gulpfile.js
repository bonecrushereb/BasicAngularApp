const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
const fork = require('child_process').fork;
const spawn = require('child_process').spawn;
const protractor = require('gulp-protractor').protractor;
const webpack = require('webpack-stream');
process.env.PORT = 5555;

const files = ['*.js', './**/**/app'];

gulp.task('sass:dev', () => {
  gulp.src('./app/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('./build'));
});

gulp.task('webpack:dev', () => {
  gulp.src('app/js/entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('test/unit/test_entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', ['webpack:dev'], () => {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('lint:dev', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

var children = [];
gulp.task('start:server', ['static:dev'], () => {
  children.push(fork('apiserver.js'));
  children.push(fork('staticserver.js'));
  children.push(spawn('mongod', ['--dbpath=./db']));
  children.push(spawn('webdriver-manager', ['start']));
});

gulp.task('protractor', ['start:server'], () => {
  return gulp.src('./src/tests/*.js')
    .pipe(protractor({
      configFile: 'test/integration/config.js',
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', (e) => {
      throw e;
    });
});


gulp.task('test', ['build:dev', 'lint:dev', 'protractor', 'start:server', 'webpack:test']);
gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass:dev']);
gulp.task('default', ['test', 'build:dev']);

gulp.task('sass:watch', ['sass:dev'], () => {
  gulp.watch('./app/**/.scss');
});

process.on('exit', () => {
  children.forEach((child) => {
    child.kill('SIGINT');
  });
});
