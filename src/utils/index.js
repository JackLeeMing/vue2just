import dayjs from 'dayjs'
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
export const finishLoading = () => {
  const ele = window.document.getElementById('loading-mask')
  ele && window.document.body.removeChild(ele)
}

export const delayTs = interval => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, interval)
  })
}

export const handleQuery = query => {
  const sensorId = (query.sensorId || '').split(',')[0]
  const outputs = (query.outputs || '').split(',')[0]
  const period = (query.period || 0) * 1
  return { ...query, period, sensorId: sensorId, outputs }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export const computeRange = function (dateType) {
  let dateRange = []
  const now = new Date()
  const nowTs = now.getTime()
  let month = now.getMonth() + 1
  let year = now.getFullYear()
  const date = now.getDate()
  const time = dayjs(nowTs).format('HH:mm:ss')
  switch (dateType) {
    case 'cd':
      dateRange = [new Date(`${year}/${month}/${date} 00:00:00`).getTime(), nowTs]
      break
    case 'cm':
      dateRange = [new Date(`${year}/${month}/01 00:00:00`).getTime(), nowTs]
      break
    case 'cy':
      dateRange = [new Date(`${year}/01/01 00:00:00`).getTime(), nowTs]
      break
    case '1h':
      dateRange = [nowTs - 1 * 1 * 3600 * 1000, nowTs]
      break
    case '2h':
      dateRange = [nowTs - 1 * 2 * 3600 * 1000, nowTs]
      break
    case '6h':
      dateRange = [nowTs - 1 * 6 * 3600 * 1000, nowTs]
      break
    case '12h':
      dateRange = [nowTs - 1 * 12 * 3600 * 1000, nowTs]
      break
    case '1d':
      dateRange = [nowTs - 1 * 24 * 3600 * 1000, nowTs]
      break
    case '2d':
      dateRange = [nowTs - 2 * 24 * 3600 * 1000, nowTs]
      break
    case '3d':
      dateRange = [nowTs - 3 * 24 * 3600 * 1000, nowTs]
      break
    case '7d':
      dateRange = [nowTs - 7 * 24 * 3600 * 1000, nowTs]
      break
    case '1m':
      month -= 1
      if (month <= 0) {
        month += 12
        year -= 1
      }
      dateRange = [new Date(`${year}/${month}/${date} ${time}`).getTime(), nowTs]
      break
    case '2m':
      month -= 2
      if (month <= 0) {
        month += 12
        year -= 1
      }
      dateRange = [new Date(`${year}/${month}/${date} ${time}`).getTime(), nowTs]
      break
    case '3m':
      month -= 3
      if (month <= 0) {
        month += 12
        year -= 1
      }
      dateRange = [new Date(`${year}/${month}/${date} ${time}`).getTime(), nowTs]
      break
    case '6m':
      month -= 6
      if (month <= 0) {
        month += 12
        year -= 1
      }
      dateRange = [new Date(`${year}/${month}/${date} ${time}`).getTime(), nowTs]
      break
    case '1y':
      year -= 1
      dateRange = [new Date(`${year}/${month}/${date} ${time}`).getTime(), nowTs]
      break
    case '2y':
      year -= 2
      dateRange = [new Date(`${year}/${month}/${date} ${time}`).getTime(), nowTs]
      break
    default:
      dateRange = [new Date('2020/01/01 ${time}').getTime(), nowTs]
      break
  }
  return dateRange
}
