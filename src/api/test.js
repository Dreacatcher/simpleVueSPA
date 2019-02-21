/*
 * @Author: lcm
 * @version: v1.0.1
 * @LastEditors: lcm
 * @Date: 2019-02-20 11:15:36
 * @LastEditTime: 2019-02-20 11:34:59
 */

import fetch from 'fetch'
/* *******************设置API请求地址***************************/
// 登录
export const userlogin = (params, callball) => {
  fetch.httpGetRequest(`${window.globalConfig.Host}/manager/login?accessToken=123`, { params: params }, (res) => {
    callball(res)
  })
}
