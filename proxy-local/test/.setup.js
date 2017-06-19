'use strict';

const mm = require('@ali/mm');

global.mm = global.mock = mm;
global.request = require('supertest');
global.assert = require('assert');

let app;
before(() => {
  app = global.app = mm.app();
  return app.ready();
});

after(() => app.close());
