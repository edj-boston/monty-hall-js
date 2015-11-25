var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    mocha = require('gulp-mocha');


// instrument the code
gulp.task('cover', function () {
    return gulp.src(['lib/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});


// Run tests and product coverage
gulp.task('test', ['cover'], function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds : {
                global : 90
            }
        }));
});