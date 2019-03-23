'use strict';

var path = require('path');
var tap = require('gulp-tap');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var modifyFilename = require('modify-filename');
var repeat = require('lodash/repeat');

module.exports = function versioningTasks(gulp) {
    const versionedFilesPattern = `**/*.${repeat('[a-f0-9]', 10)}.+([^.])`;

    gulp.task('versioning:assets', ['copy', 'sass', 'scripts:bundle'], function() {
        var versioningSource = [
            'dist/**/*.*',
            '!dist/**/*.*{ejs,html,txt}',
            `!${path.join('dist', versionedFilesPattern)}`
        ];

        return gulp
            .src(versioningSource)
            .pipe(gulp.dest('dist/'))
            .pipe(rev())
            .pipe(
                tap(file => {
                    file.path = modifyFilename(
                        file.revOrigPath,
                        (name, extension) => `${name}.${file.revHash}${extension}`
                    );
                })
            )
            .pipe(revReplace())
            .pipe(gulp.dest('dist/'))
            .pipe(rev.manifest({ base: 'dist/' }))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('versioning:views', ['versioning:assets'], function() {
        return gulp
            .src('dist/**/*.*{ejs,html}')
            .pipe(
                revReplace({
                    manifest: gulp.src('rev-manifest.json'),
                    replaceInExtensions: ['.html', '.ejs']
                })
            )
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('versioning', ['versioning:assets', 'versioning:views']);
};
