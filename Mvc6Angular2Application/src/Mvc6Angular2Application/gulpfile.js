/// <binding Clean='clean, copy' />
"use strict";

var gulp = require("gulp"),
    //rimraf = require("rimraf"),
    //concat = require("gulp-concat"),
    //cssmin = require("gulp-cssmin"),
    del = require('del'),
    uglify = require("gulp-uglify");

//var paths = {
//    webroot: "./wwwroot/"
//};

//paths.js = paths.webroot + "js/**/*.js";
//paths.minJs = paths.webroot + "js/**/*.min.js";
//paths.css = paths.webroot + "css/**/*.css";
//paths.minCss = paths.webroot + "css/**/*.min.css";
//paths.concatJsDest = paths.webroot + "js/site.min.js";
//paths.concatCssDest = paths.webroot + "css/site.min.css";

//gulp.task("clean:js", function (cb) {
//    rimraf(paths.concatJsDest, cb);
//});

//gulp.task("clean:css", function (cb) {
//    rimraf(paths.concatCssDest, cb);
//});



gulp.task('clean:libs', function () {
    return del('wwwroot/angular2/**/*');
});

gulp.task("clean", ["clean:libs"]);

// copy dependencies
gulp.task('copy:libs', function () {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'
    ]).pipe(gulp.dest('wwwroot/angular2'))
});

gulp.task('copy:angular', function () {
    return gulp.src([
        'node_modules/@angular/**/*.js',
    ]).pipe(gulp.dest('wwwroot/angular2/@angular'))
});

gulp.task('copy:rxjs', function () {
    return gulp.src([
        'node_modules/rxjs/**/*.js',
    ]).pipe(gulp.dest('wwwroot/angular2/rxjs'))
});

gulp.task('copy:angular2inmemorywebapi', function () {
    return gulp.src([
        'node_modules/angular2-in-memory-web-api/**/*.js',
    ]).pipe(gulp.dest('wwwroot/angular2/angular2-in-memory-web-api'))
});

//gulp.task("min:js", function () {
//    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
//        .pipe(concat(paths.concatJsDest))
//        .pipe(uglify())
//        .pipe(gulp.dest("."));
//});

//gulp.task("min:css", function () {
//    return gulp.src([paths.css, "!" + paths.minCss])
//        .pipe(concat(paths.concatCssDest))
//        .pipe(cssmin())
//        .pipe(gulp.dest("."));
//});

gulp.task("copy", ["copy:libs", "copy:angular", "copy:rxjs", "copy:angular2inmemorywebapi"]);
