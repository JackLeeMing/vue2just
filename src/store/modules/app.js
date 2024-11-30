const state = {
  device: 'desktop',
  outerLink: '',
  fullPath: '',
  globalLoading: false,
  loadingText: '',
  cloud: 'aliyun',
  platform: ''
}
const mutations = {
  SET_PLATFORM: (state, platform) => {
    state.platform = platform
  },
  SET_BIND_CLOUD_SERVICE: (state, bindCloudService) => {
    state.cloud = bindCloudService
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_OUTER_LINK(state, outerLink) {
    state.outerLink = outerLink
  },
  SET_TO_PATH(state, fullPath) {
    state.fullPath = fullPath
  },
  SET_LOADING: (state, args) => {
    if (typeof args === 'object') {
      const { loading, loadingText } = args
      state.loadingText = loadingText
      state.globalLoading = loading
    }
  }
}

const getters = {
  platform: state => state.platform,
  cloud: state => state.cloud,
  language: state => state.language,
  outerLink: state => state.outerLink,
  sidebarOpened: state => {
    if (state.sidebar) {
      return state.sidebar.opened
    }
    return false
  },
  fullPath: state => state.fullPath
}

const actions = {}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
