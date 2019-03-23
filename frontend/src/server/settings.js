'use strict';

const rc = require('rc');

module.exports = rc('speedcontrol', {
    server: {
        host: '0.0.0.0',
        port: 0
    },
    api: {
        baseUrl: 'http://localhost:8088/api'
    },
    googleMapsKey: 'AIzaSyBXP03ZADfjVy1our9C9tgm1ab4MJRsRXc',
    assets: {
        maxAge: 1000 * 60 * 60 * 24 * 365 // one year
    }
});
