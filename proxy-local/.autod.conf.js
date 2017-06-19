'use strict';

module.exports = {
  write: true,
  prefix: '^',
  test: [
    'test',
    'benchmark',
  ],
  dep: [
    'egg-view-nunjucks',
  ],
  semver: [
    '@ali/mm@6',
  ],
  keep: [
    '@ali/nut',
  ],
  devdep: [
    '@ali/ci',
    '@ali/egg-bin',
    'autod',
    'eslint',
    'eslint-config-egg',
    'supertest',
  ],
  exclude: [
    './test/fixtures',
  ],
  registry: 'http://registry.npm.alibaba-inc.com',
};

