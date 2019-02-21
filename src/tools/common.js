/*
 * @Author: lcm
 * @version: v1.0.1
 * @LastEditors: lcm
 * @Date: 2019-02-20 09:05:24
 * @LastEditTime: 2019-02-20 10:28:57
 */

import fetch from 'fetch'
class Tool {
  /**
   * 判斷是否是数组
   * @param {any} oNum
   * @returns
   * @memberof Tool
   */
  isNumber(oNum) {
    if (!oNum) {
      return false
    }
    var strP = /^\d+(\.\d+)?$/
    if (!strP.test(oNum)) {
      return false
    }
    try {
      if (parseInt(oNum) !== oNum || parseInt(oNum) === 0) {
        return false
      }
    } catch (ex) {
      return false
    }
    return true
  }
  /**
 * 数组去重
 * @param arr 要去重的数组
 * @returns {Array} 去重后的数组
 */
  unique(arr) {
    var ret = []
    var hash = {}

    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      var key = typeof item + item
      if (hash[key] !== 1) {
        ret.push(item)
        hash[key] = 1
      }
    }
    return ret
  }
  /**
 * 将datetime数字转换为指定日期格式的字符串。
 * @param dateStr datetime数字
 * @param format 日期格式，y - 年, M - 月，d - 日, h - 时, m - 分, s - 秒, S - 毫秒。
 * eg：formatDate("2014-2-2 00:12:00","yyyy/MM/dd")   输出："2014/02/02"
 * @return 格式化后的日期格式字符串。
 */
  formatDate(dateStr, format) {
    if (!dateStr) {
      return null
    }
    var date = new Date(dateStr)

    var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds()

      // millisecond
    }

    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return format
  }
  /**
 * 去两端空格
 * @return 字符串
 */
  trim() {
    return this.replace(/(^\s*)|(\s*$)/g, '')
  }
  /**
    * 获取url中的字符串，支持中文
    * @return 字符串
    */
  getQueryString(key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    var result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  }
  /**
    * 获取url中的字符串，支持中文
    * @return 字符串
    */
  queryString(str, key) {
    if (str && str != '') {
      var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
      var result = str.substr(1).match(reg)
      return result ? decodeURIComponent(result[2]) : null
    }
  }
  /**
   *通过高德经纬度获取地址
   * @param {any} _lng
   * @param {any} _lat
   * @param {any} _callback
   * @memberof Tool
   */
  getMyAddress(_lng, _lat, _callback) {
    var lnglatXY = parseFloat(_lng) + ',' + parseFloat(_lat)
    var datas = {
      location: lnglatXY
    }
    fetch.httpRequestPost(
      'http://restapi.amap.com/v3/geocode/regeo?key=36a6733dbb1e17b6217372bc00d3c70a&',
      'GET',
      datas,
      function (data) {
        if (data.status === '1' && data.info === 'OK') {
          _callback(data.regeocode.formatted_address) // 返回地址描述
        }
      }
    )
  }
  removeEle(_class) {
    var content = document.querySelectorAll(_class)
    if (content && content.length > 0) {
      for (var i = 0; i < content.length; i++) {
        var x = document.querySelector('body').removeChild(content[i])
        if (x.nodeType === 1) {
          x = null
        }
      }
    }
  }

  removejscssfile(filename, filetype) {
    let targetelement = filetype == 'js'
      ? 'script'
      : filetype == 'css' ? 'link' : 'none'
    let targetattr = filetype == 'js'
      ? 'src'
      : filetype == 'css' ? 'href' : 'none'
    let allsuspects = document.getElementsByTagName(targetelement)
    for (let i = allsuspects.length; i >= 0; i--) {
      if (
        allsuspects[i] &&
        allsuspects[i].getAttribute(targetattr) != null &&
        allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1
      ) { allsuspects[i].parentNode.removeChild(allsuspects[i]) }
    }
  }
  loadAppFrame() {
    var ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) {
      document.write(
        '<script type="text\/javascript" charset="utf-8" src="http:\/\/m.scity.cn\/frame\/ios\/cordova.js"><\/script>'
      )
      document.write(
        '<script type="text\/javascript" charset="utf-8" src="http:\/\/m.scity.cn\/frame\/ios\/js\/DCPlugin.js"><\/script>'
      )
      document.write(
        '<script type="text\/javascript" charset="utf-8" src="http:\/\/m.scity.cn\/frame\/ios\/plugins\/barcodescanner.js"><\/script>'
      )
    } else if (/android/.test(ua)) {
      document.write(
        '<script type="text\/javascript" charset="utf-8" src="http:\/\/m.scity.cn\/frame\/android\/cordova.js"><\/script>'
      )
    }
  }
  removeAppFrame() {
    let ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipodn/.test(ua)) {
      this.removejscssfile('"http://m.scity.cn/frame/ios/cordova.js', 'js')
      this.removejscssfile('http://m.scity.cn/frame/ios/js/DCPlugin.js', 'js')
      this.removejscssfile(
        'http://m.scity.cn/frame/ios/plugins/barcodescanner.js',
        'js'
      )
    } else if (/android/.test(ua)) {
      this.removejscssfile('http://m.scity.cn/frame/android/cordova.js', 'js')
    }
  }
  /**
   * 设置请求环境和接口队列
   * @param {any} serviceName
   * @param {any} interfaces
   * @returns
   * @memberof Tool
   */
  setUrl(serviceName, interfaces) {
    let _size = interfaces.length
    let _newinterfaces = {
      sso: []
    }
    for (let i = 0; i < _size; i++) {
      _newinterfaces.sso[interfaces[i]] = serviceName + 'service/' + interfaces[i]
    }
    return _newinterfaces
  }
  /**
   * 获取滚动区域的位置信息
   * @param {any} element
   * @returns
   * @memberof Tool
   */
  setScrollTop(element, val) {
    if (element) {
      element.scrollTop = val
    }
  }
  /**
   * 设置滚动区域的位置信息
   * @param {any} element
   * @returns
   * @memberof Tool
   */
  getScrollTop(element) {
    if (element) {
      return element.scrollTop
    } else {
      return document.documentElement.scrollTop
    }
  }
  /**
   * 获取可视区域的高度
   * @param {any} element
   * @returns
   * @memberof Tool
   */
  getVisibleHeight(element) {
    if (element) {
      return element.offsetHeight
    } else {
      return document.documentElement.scrooffsetHeightllTop
    }
  }
  /**
   * 获取滚动区域高度
   * @param {any} element
   * @returns
   * @memberof Tool
   */
  getScrollHeight(element) {
    if (element) {
      return element.scrollHeight
    } else {
      return document.documentElement.scrollHeight
    }
  }
  isScrollBottom(force) {
    let self = this
    let ele = self.element
    let option = self._option
    self.scrollTop = getScrollTop(ele)
    let _isScrollBottom = getVisibleHeight(ele) + self.scrollTop + 5 > getScrollHeight(ele)
  }
  addClass(elem, cls) {
    if (!this.hasClass(elem, cls)) {
      elem.className += ' ' + cls
    }
  }
  hasClass(elem, cls) {
    cls = cls || ''
    if (cls.replace(/\s/g, '').length == 0) return false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
  }
  removeClass(elem, cls) {
    if (this.hasClass(elem, cls)) {
      var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' '
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ')
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '')
    }
  }
}
export default new Tool()
