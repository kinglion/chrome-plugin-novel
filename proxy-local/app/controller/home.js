'use strict';

const proxy = require('koa-proxy')

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      	yield proxy({
            host: 'http://www.37zw.com'
        });
        this.ctx.set('Access-Control-Allow-Origin', '*');
        this.ctx.set('Access-Control-Allow-Methods', 'POST,GET');
        this.ctx.set('Access-Control-Allow-Headers', 'x-requested-with,content-type');
    }
  }
  return HomeController;
};
