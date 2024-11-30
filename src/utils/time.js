import dayjs from 'dayjs'
/**
 *日期格式化
 * @param date 日期对象或13位时间戳
 * @param 'yyyy-MM-dd' 格式标准
 */
export function dateFormat2(ts, format) {
  if (ts === 0) {
    return ''
  }
  return dayjs(ts).format(format)
}

export function dateFormatWithMicros(ts, dayTimeF = 'YYYY-MM-DD HH:mm:ss') {
  if (ts === 0) {
    return ''
  }
  return dayjs(ts * 1).format(`${dayTimeF}.SSS`)
}

export function dateFormatWithOutMicros(ts, dayTimeF = 'YYYY-MM-DD HH:mm:ss') {
  if (ts === 0) {
    return ''
  }
  return dayjs(ts * 1).format(`${dayTimeF}`)
}

export function dateFormat(date, format) {
  if (date === 0) {
    return ''
  }
  const dateObj = new Date(date)
  const map = {
    M: dateObj.getMonth() + 1, // 月份
    d: dateObj.getDate(), // 日
    h: dateObj.getHours(), // 24小时制
    H: dateObj.getHours() % 12, // 12小时制
    k: dateObj.getHours() > 12 ? 'PM' : 'AM',
    m: dateObj.getMinutes(), // 分
    s: dateObj.getSeconds(), // 秒
    q: Math.floor((dateObj.getMonth() + 3) / 3), // 季度
    S: dateObj.getMilliseconds() // 毫秒
  }
  const str = format.replace(/([yMdhHkmsqS])+/g, function (all, t) {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1 && t !== 'S') {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (dateObj.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return str
}

/**
 * 获取当前时间 按格式化输出
 * @param 'yyyy-MM-dd' 格式标准
 */
export function getCurrentDate(format) {
  return dateFormat(new Date(), !format ? 'yyyy-MM-dd' : format)
}
/**
 * 判断是否闰年
 */
export function is_leap(year) {
  return !!(year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0))
}
/**
 * 一年中所有月的天数
 */
export function m_days(year) {
  return [31, 28 + is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}
/**
 * 月份第一天是周几
 * @param date 默认当前时间
 */
export function firstDay(date) {
  const dateObj = new Date(date || new Date())
  dateObj.setDate(1)
  return dateObj.getDay()
}
/**
 * 返回下一个月
 * @param date 默认当前时间
 */
export function nextMonth(date, format) {
  const dateObj = new Date(date || new Date())
  dateObj.setMonth(dateObj.getMonth() + 1)
  return dateFormat(dateObj, !format ? 'yyyy-MM' : format)
}
/**
 * 返回上一个月
 * @param date 默认当前时间
 */
export function lastMonth(date, format) {
  const dateObj = new Date(date || new Date())
  dateObj.setMonth(dateObj.getMonth() - 1)
  return dateFormat(dateObj, !format ? 'yyyy-MM' : format)
}
/**
 * 根据年月获取月份天数
 * @param date 默认当前时间
 */
export function getDayForMonth(date) {
  const dateObj = new Date(date || new Date())
  dateObj.setMonth(dateObj.getMonth() + 1)
  dateObj.setDate(0)
  return dateObj.getDate()
}
/**
 * 转换成 ‘几天前’格式
 * @param date 13位时间戳
 */
export function transformToCount(source) {
  if (!source) {
    return
  }
  const publishTime = parseInt(source)
  let d_seconds = 0
  let d_minutes = 0
  let d_hours = 0
  let d_days = 0
  const timeNow = parseInt(new Date().getTime())
  const d = timeNow - publishTime
  d_days = parseInt(d / 86400000)
  d_hours = parseInt(d / 3600000)
  d_minutes = parseInt(d / 60000)
  d_seconds = parseInt(d / 1000)
  if (d_days > 0 && d_days < 3) {
    return d_days + '天前'
  } else if (d_days <= 0 && d_hours > 0) {
    return d_hours + '小时前'
  } else if (d_hours <= 0 && d_minutes > 0) {
    return d_minutes + '分钟前'
  } else if (d_seconds < 60) {
    if (d_seconds <= 0) {
      return '刚刚发表'
    } else {
      return d_seconds + '秒前'
    }
  } else if (d_days >= 3 && d_days < 30) {
    return dateFormat(source, 'MM月dd日 hh:ss')
  } else if (d_days >= 30) {
    return dateFormat(source, 'yyyy年MM月dd日')
  }
}
/**
 * @param dateString  2018-01-24 11:05
 * @return date
 */
export function dateParse(dateString) {
  const curDate = dateString.replace(/-/g, '/')
  return new Date(Date.parse(curDate))
}
/**
 *日期计算
 * @param {string} interval 字符串，计量单位，例：年：'y'
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @param {Number} number 要添加的数值
 * @param {dateObj} date 日期对象
 * @return {dateObj}
 */
export function dateAdd(interval, number, date) {
  switch (interval) {
    case 'y': {
      date.setFullYear(date.getFullYear() + number)
      return date
    }
    case 'q': {
      date.setMonth(date.getMonth() + number * 3)
      return date
    }
    case 'M': {
      date.setMonth(date.getMonth() + number)
      return date
    }
    case 'w': {
      date.setDate(date.getDate() + number * 7)
      return date
    }
    case 'd': {
      date.setDate(date.getDate() + number)
      return date
    }
    case 'h': {
      date.setHours(date.getHours() + number)
      return date
    }
    case 'm': {
      date.setMinutes(date.getMinutes() + number)
      return date
    }
    case 's': {
      date.setSeconds(date.getSeconds() + number)
      return date
    }
    default: {
      throw console.error('interval is requied')
    }
  }
}
