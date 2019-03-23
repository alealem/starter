'use strict';

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

module.exports = function watchTasks(gulp, settings) {
    gulp.task('watch', function(cb) {
        browserSync.init(settings.browserSync);

        runSequence.use(gulp)(['scripts:compile', 'sass', 'copy'], function() {
            var changeCallback = function(event) {
                console.log(`File ${event.path} was ${event.type} , running tasks...`); // eslint-disable-line no-console
            };

            gulp.watch(['src/**/*.scss'], ['sass']).on('change', changeCallback);

            gulp.watch(['assets/**/*'], ['copy']).on('change', changeCallback);

            cb();
        });
    });
};
