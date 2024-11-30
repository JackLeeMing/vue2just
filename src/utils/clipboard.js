import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

export function handleClipboard2(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

export default function handleClipboard(text, event, back) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    if (back && typeof back === 'function') {
      back({ type: 'success' })
    }
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    if (back && typeof back === 'function') {
      back({ type: 'error' })
    }
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
