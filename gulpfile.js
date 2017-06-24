'use strict';

const g   = require('gulp-load-plugins')(),
    gulp  = require('gulp'),
    rules = require('edj-eslint-rules');


// Lint as JS files (including this one)
gulp.task('lint', () => {
    const globs = [
        'lib/*.js',
        'test/*.js',
        'gulpfile.js',
        '!node_modules/**'
    ];

    return gulp.src(globs)
        .pipe(g.eslint({
            extends       : 'eslint:recommended',
            parserOptions : { ecmaVersion : 6 },
            rules
        }))
        .pipe(g.eslint.format())
        .pipe(g.eslint.failAfterError());
});


// Instrument the code
gulp.task('cover', () => {
    return gulp.src('lib/*.js')
        .pipe(g.istanbul())
        .pipe(g.istanbul.hookRequire());
});


// Run tests and product coverage
gulp.task('test', () => {
    return gulp.src('test/*.js')
        .pipe(g.mocha({
            require : [ 'should' ]
        }))
        .pipe(g.istanbul.writeReports())
        .pipe(g.istanbul.enforceThresholds({
            thresholds : { global : 100 }
        }));
});


// Check deps with David service
gulp.task('deps', () => {
    return gulp.src('package.json')
        .pipe(g.david());
});


// Watch certain files
gulp.task('watch', () => {
    const globs = [
        'lib/**',
        'test/**'
    ];

    gulp.watch(globs, [ 'smoke' ])
        .on('change', e => {
            g.util.log('File', e.type, e.path);
        });
});


// Run tests and product coverage
gulp.task('coveralls', () => {
    return gulp.src('coverage/lcov.info')
        .pipe(g.coveralls());
});


// Run tests and produce coverage
gulp.task('travis', done => {
    g.sequence(
        'cover',
        'test',
        'coveralls'
    )(done);
});


// Cover, run tests, and lint
gulp.task('smoke', done => {
    g.sequence(
        'cover',
        'test',
        'lint'
    )(done);
});


// Default task for when you run `$ gulp`
gulp.task('default', done => {
    g.sequence(
        'deps',
        'smoke',
        'watch'
    )(done);
});
