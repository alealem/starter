'use strict';

var gulp = require('gulp');
var minimist = require('minimist');
var forEach = require('lodash/forEach');
var map = require('lodash/map');
var requireDir = require('require-dir');

const APPLICATION_SETTINGS = {
    production: {},
    development: {}
};

initialize();

gulp.task('default', ['copy', 'sass', 'scripts:compile']);

gulp.task('dist', ['copy', 'sass', 'scripts:bundle', 'versioning']);

/**
 * Initializes build system.
 */
function initialize() {
    var options = minimist(process.argv.slice(2), {
        string: ['env', 'prefix', 'browserSyncProxy'],
        default: {
            env: 'development',
            prefix: 'speedcontrol_',
            browserSync: {
                browser: [],
                proxy: 'localhost:3000',
                port: 3001
            }
        }
    });

    transformBuildOptions(options);
    addSettingsToProcessEnv(options);
    initializeTasks(options);
}

/**
 * Adds all application settings as environment variables with provided prefix.
 * @param {object} options
 */
function addSettingsToProcessEnv(options) {
    var settingsObject = APPLICATION_SETTINGS[options.env];

    if (settingsObject == null) {
        throw new Error(`Unknown environment '${options.env}'`);
    }

    forEach(settingsObject, (value, key) => {
        var prefixedKey = options.prefix + key;
        process.env[prefixedKey] = value;
    });

    process.env.NODE_ENV = options.env;
}

/**
 * Initializes all available task modules.
 */
function initializeTasks(options) {
    var tasksModules = requireDir('./build-tasks');
    map(tasksModules, module => module(gulp, options));
}

/**
 * Transforms build options to provide an easier interface to the task modules.
 * @param {object} options
 */
function transformBuildOptions(options) {
    options.watch = options._[0] === 'watch';
    options.production = options.env === 'production';
}
