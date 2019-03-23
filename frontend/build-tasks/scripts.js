'use strict';

var chalk = require('chalk');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var looseEnvify = require('loose-envify');
var aliasify = require('aliasify');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

module.exports = function scriptsTasks(gulp, settings) {
    const runBrowserify = (entries, output) => {
        var b = browserify({
            entries: entries,
            cache: {},
            packageCache: {},
            extensions: ['.jsx'],
            transform: [babelify, aliasify, looseEnvify],
            plugin: settings.watch ? [watchify] : []
        });

        const bundle = () =>
            b
                .bundle()
                .on('error', error =>
                    gutil.log(chalk.red('Browserify Error'), error.stack || error.message)
                )
                .pipe(source(output))
                .pipe(gulp.dest('dist/assets/js'))
                .pipe(browserSync.stream({ once: true }));

        b.on('update', bundle);
        b.on('log', msg => gutil.log(chalk.yellow('Watchify'), msg));

        return bundle();
    };

    gulp.task('scripts:eslint', function() {
        return gulp
            .src('src/**/*.js*')
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });

    gulp.task('scripts:compile', function() {
        return runBrowserify([`src/app/index.js`], 'speedcontrol.js');
    });

    gulp.task('scripts:bundle', ['scripts:eslint', 'scripts:compile'], function() {
        return gulp
            .src('dist/assets/js/*.js')
            .pipe(
                uglify({
                    mangle: false
                })
            )
            .pipe(gulp.dest('dist/assets/js'));
    });
};
