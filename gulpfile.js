'use strict';

const coveralls = require('gulp-coveralls'),
    david       = require('gulp-david'),
    eslint      = require('gulp-eslint'),
    gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    istanbul    = require('gulp-istanbul'),
    mocha       = require('gulp-mocha'),
    rules       = require('edj-eslint-rules'),
    sequence    = require('gulp-sequence');


// Lint as JS files (including this one)
gulp.task('lint', () => {
    return gulp.src([
        'lib/*.js',
        'test/*.js',
        'gulpfile.js',
        '!node_modules/**'
    ])
    .pipe(eslint({
        extends : 'eslint:recommended',
        env     : { es6 : true, node : true, mocha : true },
        rules
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


// Instrument the code
gulp.task('cover', () => {
    return gulp.src('lib/*.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});


// Run tests and product coverage
gulp.task('test', () => {
    return gulp.src('test/*.js')
        .pipe(mocha({
            require : [ 'should' ]
        }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds : { global : 100 }
        }));
});


// Check deps with David service
gulp.task('deps', () => {
    return gulp.src('package.json')
        .pipe(david());
});


// Watch certain files
gulp.task('watch', () => {
    const globs = [
        'lib/**',
        'test/**'
    ];

    gulp.watch(globs, [ 'smoke' ])
        .on('change', e => {
            gutil.log('File', e.type, e.path);
        });
});


// Run tests and product coverage
gulp.task('coveralls', () => {
    return gulp.src('coverage/lcov.info')
        .pipe(coveralls());
});


// Run tests and produce coverage
gulp.task('travis', done => {
    sequence(
        'cover',
        'test',
        'coveralls'
    )(done);
});


// Cover, run tests, and lint
gulp.task('smoke', done => {
    sequence(
        'cover',
        'test',
        'lint'
    )(done);
});


// Default task for when you run `$ gulp`
gulp.task('default', done => {
    sequence(
        'deps',
        'smoke',
        'watch'
    )(done);
});
