require('babel-register');
require('babel-polyfill');

// So that react can run as if it's in a browser
global.document = require('jsdom').jsdom('<body><div id="app"></div></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

