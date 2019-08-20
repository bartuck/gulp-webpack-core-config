'use strict';

// Constants
const PORT = 3000;
const SRC_DIR = 'src';
const OUT_DIR = 'dist';
const WEBPACK_OUT_DIR = OUT_DIR + '/';
const SRC_TRANS = 'en_GB.json'; // If it's changed on watch, you have to call $ gulp watch again
const DEFAULT_TASKS = [cleanDest, copy, translate, processJs, processCss];

// Imports
const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const mustache = require("gulp-mustache");

sass.compiler = require('node-sass');

// Tasks Definitions
function cleanDest(next) {
  del.sync([OUT_DIR + '/**']);
  next();
}

function serve(next) {
  browserSync.init({
    server: OUT_DIR,
    open: false,
    port: PORT
  });
  next();
}

function reload(next) {
  browserSync.reload();
  next();
}

function copy() {
  return gulp.src([
    SRC_DIR + '/**/*.jpg'
  ]).pipe(gulp.dest(OUT_DIR));
}

function processJs() {
  return gulp.src(WEBPACK_OUT_DIR)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(WEBPACK_OUT_DIR + '/js'));
}

function processCss() {
  return gulp.src(SRC_DIR + '/scss/**/*.scss',)
    .pipe(sass().on('error', sass.logError))
    .pipe(sass.sync({outputStyle: 'compressed'}))
    .pipe(rename({
      basename: 'styles',
      suffix: '.min'
    }))
    .pipe(gulp.dest(OUT_DIR + '/css/'));
}

function translate() {
  return gulp.src(SRC_DIR + '/*.html')
    .pipe(mustache(SRC_DIR + '/translations/' + SRC_TRANS, {}, {}))
    .pipe(gulp.dest('./' + OUT_DIR));
}

function watch() {
  gulp.watch(SRC_DIR + '/*.jpg', gulp.series(copy, reload));
  gulp.watch(SRC_DIR + '/*.html', gulp.series(translate, reload));
  gulp.watch(SRC_DIR + '/translations/*.json', gulp.series(translate, reload));
  gulp.watch(SRC_DIR + '/scss/**/*.scss', gulp.series(processCss, reload));
  gulp.watch(SRC_DIR + '/js/*.js', gulp.series(processJs, reload));
}

/**
 * Tasks
 */

// Just build and finish
gulp.task('build', gulp.series(DEFAULT_TASKS));

// Build and serve
gulp.task('serve', gulp.series(DEFAULT_TASKS, serve));

// Build, serve and watch for changes
gulp.task('watch', gulp.series(DEFAULT_TASKS, gulp.parallel(serve, watch)));
