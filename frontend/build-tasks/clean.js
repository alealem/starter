'use strict';

var del = require('del');

module.exports = function cleanTasks(gulp) {
    gulp.task('clean:build', function() {
        return del(['dist/', 'rev-manifest.json']);
    });

    gulp.task('clean', ['clean:build']);
};
