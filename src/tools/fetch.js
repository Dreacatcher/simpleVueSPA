/*
 * @Author: lcm
 * @version: v1.0.1
 * @LastEditors: lcm
 * @Date: 2019-02-20 09:05:24
 * @LastEditTime: 2019-02-20 10:44:53
 */
import axios from 'axios'
import B from 'base'

// ******************************* Setting ***********************************/
let appid = 'BAS5-cxzxc-0001'
let appkey = 'cxzczcxzxc'
let siteid = 'cxzcxzcxzcxzcx'
// ******************************* Setting ***********************************/
class Fetch {
  packageParamBase (param) {
    let _param = param || {}
    let _requestParam = {
      head: {
        appid: appid,
        sign: B.encrypt(appkey, B.toMd5(B.toBase64(appid + B.toJson(_param)))),
        siteid: siteid,
        version: '2.0'
      },
      body: param
    }
    return B.toJson(_requestParam)
  }
  httpPostRequest(url, data, callback) {
    // POST
    let _requestParam = this.packageParamBase(data)
    axios({
      method: 'post',
      url: url,
      data: _requestParam,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error&&error.response){
      		 callback(error.response)	
      	}
      })
  }
  httpGetRequest(url, data, callback) {
    // GET
    data = this.dataEncode(data)
    axios
      .get(url, data)
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
      	if(error&&error.response){
      		 callback(error.response)	
      	}
      })
  }
  httpPutRequest(url, data, callback) {
    // put
    let _requestParam = this.packageParamBase(data)
    axios({
      method: 'put',
      url: url,
      data: _requestParam,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error&&error.response){
      		 callback(error.response)	
      	}
      })
  }
  // ---------------XSS--------------//
  htmlEncode (str) {
    let s = ''
    if (str.length === 0) return ''
    // s = str.replace(/ /g, "&nbsp;");
    // s = str.replace(/&/g, "&amp;");
    s = str.replace(/</g, '%26lt%3B')
    s = s.replace(/%3C/g, '%26lt%3B')
    s = s.replace(/%3c/g, '%26lt%3B')
    s = s.replace(/>/g, '%26gt%3B')
    s = s.replace(/%3E/g, '%26gt%3B')
    s = s.replace(/%3e/g, '%26gt%3B')
    // s = s.replace(/\'/g, "&#39;");
    // s = s.replace(/\"/g, "&quot;");
    // s = s.replace(/\n/g, "<br>");
    return s
  }
  dataEncode (data) {
    // Encode
    let rel = data
    let source = ''
    if (typeof rel === 'object') {
      source = this.htmlEncode(JSON.stringify(rel))
      source = JSON.parse(source)
      rel = source
    } else if (typeof rel === 'string') {
      source = this.htmlEncode(rel)
      rel = source
    }
    return rel
  }
}
export default new Fetch()
