import env from './env.js'
let conf = env
try {
  if (localStorage.externalSettings) {
    conf = Object.assign(env, JSON.parse(localStorage.externalSettings))
  }
} catch (error) {
  console.log(error)
}

export default conf
