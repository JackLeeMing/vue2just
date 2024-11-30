import { dateFormat } from '@/utils/time' // 日期格式化
// eslint-disable-next-line space-before-function-paren
export default function timeF(value) {
  if (value && !isNaN(value)) {
    const ts = Math.floor(value * 1)
    if (`${ts}`.length === 13) {
      return dateFormat(new Date(value * 1), 'yyyy-MM-dd hh:mm:ss')
    }
    return dateFormat(new Date(value * 1 * 1000), 'yyyy-MM-dd hh:mm:ss')
  } else {
    if (value) return value
  }
  return ''
}
