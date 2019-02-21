/*
 * @Author: lcm
 * @version: v1.0.1
 * @LastEditors: lcm
 * @Date: 2019-02-20 09:05:24
 * @LastEditTime: 2019-02-20 15:30:29
 */


'use strict'
var path = require('path')
var srcDir = path.resolve(process.cwd(), 'src')
var components = require('./_include/components')


var base = {
  // lib
  base64: srcDir + '/tools/base64',
  base: srcDir + '/tools/base',
  fetch: srcDir + '/tools/fetch',
  storage: srcDir + '/tools/storage',
  common: srcDir + '/tools/common',
  // --------------------------------通用组件------------------------------------//
  'vue$': 'vue/dist/vue.esm.js',
  'src': path.resolve(__dirname, '../src'),
  'assets': path.resolve(__dirname, '../src/assets')
}
var newConfig = Object.assign(base,
  components
);
module.exports = newConfig


