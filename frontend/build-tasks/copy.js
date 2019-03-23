'use strict';

var browserSync = require('browser-sync');

module.exports = function copyTasks(gulp) {
    gulp.task('copy:assets', function() {
        return gulp
            .src('assets/**/*')
            .pipe(gulp.dest('dist/assets'))
            .pipe(browserSync.stream());
    });

    gulp.task('copy:html', function() {
        return gulp
            .src('src/server/views/**/*.*{html,ejs}')
            .pipe(gulp.dest('dist'))
            .pipe(browserSync.stream());
    });

    gulp.task('copy', ['copy:assets', 'copy:html']);
};
