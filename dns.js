const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser')
const { glob } = require('glob')
const urlRegex = require('url-regex')
const urlPattern = /(https?:\/\/[^/]*)/i
const urls = new Set()

const ignoreHost = [
  'https://bit.ly',
  'http://www.w3.org',
  'https://github.com',
  'http://localhost',
  'http://www.smartbow.net',
  'https://beian.miit.gov.cn',
  'https://daneden.github.io',
  'http://opensource.org',
  'https://www.webrtc-experiment.com',
  'https://unpkg.com',
  'https://aomedia.org',
  'https://emscripten.org'
]

async function searchDomain() {
  const files = await glob('docker/dist/**/*.{html,css,js}')
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf-8')
    const matches = source.match(urlRegex({ strict: true }))
    if (matches) {
      matches.forEach(url => {
        const match = url.match(urlPattern)
        if (match && match[1]) {
          urls.add(match[1])
        }
      })
    }
  }
}

async function intertLinks() {
  const files = await glob('docker/dist/**/*.html')
  const links = [...urls]
    .filter(_url => !ignoreHost.includes(_url))
    .map(url => `<link rel="dns-prefetch" href="${url}" />`)
    .join('\n')
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf-8')
    const root = parse(html)
    const head = root.querySelector('head')
    head.insertAdjacentHTML('afterbegin', links)
    fs.writeFileSync(file, root.toString())
  }
}

async function main() {
  await searchDomain()
  await intertLinks()
}

main()
