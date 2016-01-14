var coveralls = require('gulp-coveralls'),
    david     = require('gulp-david'),
    eslint    = require('gulp-eslint'),
    gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    istanbul  = require('gulp-istanbul'),
    mocha     = require('gulp-mocha'),
    sequence  = require('gulp-sequence');


// Lint as JS files (including this one)
gulp.task('lint', function () {
    return gulp.src([
        'lib/*.js',
        'test/*.js',
        'gulpfile.js',
        '!node_modules/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
});


// Instrument the code
gulp.task('cover', function () {
    return gulp.src('lib/*.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});


// Run tests and product coverage
gulp.task('test', function () {
    return gulp.src('test/*.js')
        .pipe(mocha({
            require : [ 'should' ]
        }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds : { global : 90 }
        }));
});


// Check deps with David service
gulp.task('deps', function() {
    return gulp.src('package.json')
        .pipe(david({ update: true }))
        .pipe(david.reporter)
        .pipe(gulp.dest('.'));
});


// Watch certain files
gulp.task('watch', function() {
    var globs = [
        'lib/**',
        'test/**'
    ];

    gulp.watch(globs, ['test'])
        .on('change', function(e) {
            gutil.log('File', e.type, e.path);
        });
});


// Run tests and product coverage
gulp.task('coveralls', function () {
    return gulp.src('coverage/lcov.info')
        .pipe(coveralls());
});


// Run tests and product coverage
gulp.task('travis', function(done) {
    sequence(
        'cover',
        'test',
        'coveralls'
    )(done);
});


// Default task for when you run `$ gulp`
gulp.task('default', function(done) {
    sequence(
        'deps',
        'cover',
        'test',
        'watch'
    )(done);
});