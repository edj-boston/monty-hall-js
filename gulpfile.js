var coveralls = require('gulp-coveralls'),
    david     = require('gulp-david'),
    eslint    = require('gulp-eslint'),
    gulp      = require('gulp'),
    istanbul  = require('gulp-istanbul'),
    mocha     = require('gulp-mocha');


// Lint as JS files (including this one)
gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint({
            rules : {
                camelcase : 1,
                'comma-dangle' : 2,
                quotes : 0
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


// Instrument the code
gulp.task('cover', ['lint'], function () {
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


// Check deps with David service
gulp.task('deps', function() {
    return gulp.src('package.json')
        .pipe(david({ update: true }))
        .pipe(david.reporter)
        .pipe(gulp.dest('.'));
});


// Watch certain files
gulp.task('watch', ['deps', 'test'], function() {
    return gulp.watch([
        'lib/**',
        'test/**'
    ], ['test']);
});


// Run tests and product coverage
gulp.task('coveralls', ['test'], function () {
    return gulp.src('coverage/lcov.info')
        .pipe(coveralls());
});

gulp.task('default', ['watch']);