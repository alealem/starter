'use strict';

var autoprefixer = require('gulp-autoprefixer');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var importOnce = require('node-sass-import-once');
var gutil = require('gulp-util');
var sourceMaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var chalk = require('chalk');

module.exports = function sassTasks(gulp, settings) {
    gulp.task('sass', function() {
        var sassOptions = {
            outputStyle: settings.production ? 'compressed' : 'compact',
            importer: importOnce,
            importOnce: {
                index: true
            },
            includePaths: ['node_modules', 'node_modules/foundation-sites/scss/']
        };

        var autoprefixerOptions = {
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
        };

        const logError = function(error) {
            if (settings.watch) {
                gutil.log(chalk.red('SCSS Error'), error.stack || error.message);
            } else {
                throw error;
            }
        };

        return gulp
            .src('src/scss/speedcontrol.scss')
            .pipe(gulpIf(!settings.production, sourceMaps.init()))
            .pipe(sass(sassOptions).on('error', logError))
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(gulpIf(!settings.production, sourceMaps.write()))
            .pipe(gulp.dest('dist/assets/css'))
            .pipe(browserSync.stream());
    });
};
