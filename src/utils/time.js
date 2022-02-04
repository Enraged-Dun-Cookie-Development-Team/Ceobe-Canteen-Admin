function transformDate(dateValue) {
  if (typeof dateValue !== 'object' || dateValue.constructor !== Date) {
    dateValue = new Date(dateValue);
  }
  return dateValue;
}

class TimeUtil {
  /**
     * 格式化Date，支持yyyy-MM-dd hh:mm:ss
     */
  static format(date, formatText) {
    date = transformDate(date);
    const o = {
      // 月份
      'M+': date.getMonth() + 1,
      // 日
      'd+': date.getDate(),
      // 小时
      'h+': date.getHours(),
      // 分
      'm+': date.getMinutes(),
      // 秒
      's+': date.getSeconds()
      // 季度和毫秒的格式化：可以支持，但没必要
      // //季度
      // "q+": Math.floor((date.getMonth() + 3) / 3),
      // //毫秒
      // "S": date.getMilliseconds()
    }
    if (/(y+)/.test(formatText)) {
      formatText = formatText.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(formatText)) {
        formatText = formatText.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return formatText;
  }

  // 转换为中国时间
  static changeToCCT(date) {
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const cct = utc + (3600000 * 8);
    const cctDate = new Date(cct);
    return cctDate;
  }

  // 返回昨天时间
  static lastDayTime(date) {
    date.setTime(date.getTime() - 3600 * 1000 * 24);
    return date;
  }

  // 返回明天时间
  static tomorrowTime(date) {
    date.setTime(date.getTime() + 3600 * 1000 * 24);
    return date;
  }

  // 返回当日4点
  static fourTime(date) {
    const datetime = new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()} 04:00:00`);
    return datetime;
  }

  // 返回当日16点
  static sixteenTime(date) {
    const datetime = new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()} 16:00:00`);
    return datetime;
  }

  /*
      param:
          date: 当前时间
          hour: 几小时后
      return：几个小时后-1秒
      */
  static passHourTime(date, hour) {
    date = new Date(date);
    date.setHours(date.getHours() + hour);
    date.setSeconds(date.getSeconds() - 1);
    return date;
  }
}

export default TimeUtil
