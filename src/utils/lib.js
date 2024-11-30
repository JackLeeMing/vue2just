export const decimalToHexadecimal = (value, double = false) => {
  if (!value || isNaN(value)) return ''
  const decimalNumber = value * 1
  return double ? `${value}/0x${decimalNumber.toString(16)}` : `0x${decimalNumber.toString(16)}`
}

export const statusMap = {
  ONLINE: '在线',
  OFFLINE: '离线',
  ABNORMAL: '异常',
  INACTIVE: '未激活',
  FROZEN: '冻结'
}
export const statusColorMap = {
  ONLINE: '#17d85a',
  OFFLINE: 'rgb(155, 155, 155)',
  ABNORMAL: '#ee0a24',
  INACTIVE: 'rgb(155, 155, 155)',
  FROZEN: 'rgb(255, 163, 50);'
}

export const MSG_STATUS_MAP = {
  SEND_SUCCESS: '成功',
  SEND_FAIL: '失败',
  SUCCESS: '成功',
  FAIL: '失败'
}

export const debounce = (fn, duration = 500) => {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, duration)
  }
}

export const SPECIAL_PROJECTS = ['xctdq20240923', 'jjdq20240830']

export const BaseTabs = [
  {
    label: '监测设备',
    path: 'SensorDevice',
    icon: {
      active: 'tab1-active',
      inactive: 'tab1'
    }
  },
  {
    label: '报警',
    path: 'Alarm',
    icon: {
      active: 'tab2-active',
      inactive: 'tab2'
    }
  },
  {
    label: '报警设备',
    path: 'AlarmDevice',
    icon: {
      active: 'tab3-active',
      inactive: 'tab3'
    }
  },
  {
    label: '关于',
    path: 'About',
    icon: {
      active: 'tab4-active',
      inactive: 'tab4'
    }
  }
]

export const BaseTabs2 = [
  {
    label: '报警',
    path: 'Alarm',
    icon: {
      active: 'tab1-active',
      inactive: 'tab1'
    }
  },
  {
    label: '监测设备',
    path: 'SensorDevice',
    icon: {
      active: 'tab2-active',
      inactive: 'tab2'
    }
  },

  {
    label: '报警设备',
    path: 'AlarmDevice',
    icon: {
      active: 'tab3-active',
      inactive: 'tab3'
    }
  },
  {
    label: '关于',
    path: 'About',
    icon: {
      active: 'tab4-active',
      inactive: 'tab4'
    }
  }
]

export function getTabs(projectName) {
  if (SPECIAL_PROJECTS.includes(projectName)) {
    return BaseTabs2
  }
  return BaseTabs
}
