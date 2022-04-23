const check = {
  /**
   * 非空校验
   * @param rule
   * @param value
   * @param callback
   */
  isNullOrEmpty: function (value) {
    if (value === ''
      || value === null || value === 'null'
      || value === undefined || value === 'undefined') {
      return true;
    }
    return false;
  },
  /**
   * 比较字符串时候相等
   * @param str_one
   * @param str_two
   * @returns {boolean}
   */
  isEqual(str_one, str_two) {
    if (this.isNullOrEmpty(str_one) && this.isNullOrEmpty(str_two)) {
      return true;
    } else {
      if (this.isNullOrEmpty(str_one)) {
        str_one = '';
      }
      if (this.isNullOrEmpty(str_two)) {
        str_two = '';
      }
      if (str_one.toString() === str_two.toString()) {
        return true;
      }
    }
    return false;
  },
  /**
   * 日期比较
   * end>start?true:false
   * @param start
   * @param end
   */
  checkRangeDate(start, end) {
    var startTime = new Date(start);
    var endTime = new Date(end);
    if (endTime > startTime) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 将字符串或数字转换成字符串进行校验，再转换为number返回
   * @param date
   */
  parseToFloat(date) {
    var LWXS_REGEXP = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;
    const tp = typeof date;
    // 通过正则表达式校验
    if (tp === 'number') {
      const result = LWXS_REGEXP.test(date.toString());
      if (!result) {
        return null;
      }
      return date;
    } else if (tp === 'string') {
      const result = LWXS_REGEXP.test(date);
      if (!result) {
        return null;
      }
      return parseFloat(date);
    } else {
      return null;
    }

  },

  /**
   * 下拉选择截取数字如0-30  0 30
   */
  interceptNumbers(data) {
    let qsnumeral;
    let znumeral;
    if (data.includes('-')) {
      let numeralList = data.split('-');
      numeralList.some((item, index, arr) => { // item为数组中的元素，index为下标，arr为目标数组
        qsnumeral = Number.parseInt(arr[0]);
        znumeral = Number.parseInt(arr[1]);
      })
      return [qsnumeral, znumeral]

    } else {
      qsnumeral = Number.parseInt(data);
      znumeral = '';
      return [qsnumeral, znumeral]
    }
  },
  /**
   * 时间格式
   * @param date
   * @param fmt
   * @returns {*}
   */
  formatDate(date, fmt) {
    date = new Date(date)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
      }
    }
    return fmt;
  },

  /**
   * 循环处理时间
   */
  mapDate(data, sjName) {
    if (!data) return data;
    let dataList = []
    dataList = data.map((item) => {
      if (item[sjName] === item[sjName]) {
        if (item[sjName] != '') {
          item[sjName] = this.formatDate(item[sjName], 'yyyy-MM-dd')
        }
      }
      return item;
    });
    return dataList
  }
}
export default check
