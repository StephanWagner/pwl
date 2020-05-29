var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpCleanCSS = require('gulp-clean-css');
var gulpConcat = require('gulp-concat');
var gulpIf = require('gulp-if');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpBabel = require('gulp-babel');

// CSS
var styles = [{
  name: 'main',
  src: [
    './resources/scss/normalize.scss',
    './resources/scss/reset.scss',
    './node_modules/jbox/dist/jBox.all.css',
    './resources/scss/main.scss'
  ],
  srcWatch: ['./resources/scss/**/*.scss'],
  dest: './public/css/'
}];

// JavaScript
var scripts = [{
  name: 'main',
  src: [
    './node_modules/jbox/dist/jBox.all.js',
    './resources/js/util.js',
    './resources/js/main.js'
  ],
  dest: './public/js/'
}];

// Config tasks
let defaultTasks = [];
let buildTasks = [];
let watchTasks = [];

// Config CSS tasks
for (const item of styles) {

  // Concat CSS
  const cssConcat = function () {
    return gulp
      .src(item.src)
      .pipe(gulpSourcemaps.init())
      .pipe(gulpSass({
        outputStyle: 'expanded'
      }).on('error', gulpSass.logError))
      .pipe(gulpConcat(item.name + '.css'))
      .pipe(gulpSourcemaps.write('./'))
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('cssConcat-' + item.name, cssConcat);

  // Add to default tasks
  defaultTasks.push('cssConcat-' + item.name);

  // Add to watch tasks
  watchTasks.push({
    src: item.srcWatch || item.src,
    task: cssConcat
  });

  // Build CSS
  const cssBuild = function () {
    return gulp
      .src(item.dest + item.name + '.css')
      .pipe(gulpRename(item.name + '.min.css'))
      .pipe(gulpCleanCSS())
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('cssBuild-' + item.name, cssBuild);

  // Add to build tasks
  buildTasks.push('cssBuild-' + item.name);
}

// Config JavaScript tasks
for (let item of scripts) {

  // Concat JavaScript
  const jsConcat = function () {
    return gulp
      .src(item.src)
      .pipe(gulpSourcemaps.init())
      .pipe(gulpIf(item.ecma, gulpBabel({
        presets: ['@babel/env']
      })))
      .pipe(gulpConcat(item.name + '.js'))
      .pipe(gulpSourcemaps.write('./'))
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('jsConcat-' + item.name, jsConcat);

  // Add to default tasks
  defaultTasks.push('jsConcat-' + item.name);

  // Add to watch tasks
  watchTasks.push({
    src: item.src,
    task: jsConcat
  });

  // Build JavaScript
  const jsBuild = function () {
    return gulp
      .src(item.dest + item.name + '.js')
      .pipe(gulpRename(item.name + '.min.js'))
      .pipe(gulpUglify())
      .pipe(gulp.dest(item.dest));
  };

  // Store as a task
  gulp.task('jsBuild-' + item.name, jsBuild);

  // Add to build tasks
  buildTasks.push('jsBuild-' + item.name);
}

// Watch tasks
function watch() {
  for (const watchTask of watchTasks) {
    gulp.watch(watchTask.src, watchTask.task);
  }
}

exports.default = gulp.series(defaultTasks);
exports.watch = gulp.series(defaultTasks, watch);
exports.build = gulp.series(defaultTasks, buildTasks);
