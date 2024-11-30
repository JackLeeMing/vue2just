export const isTokenOk = token => {
  const tokenOk = token && token !== 'undefined'
  return tokenOk
}

export const whiteList = ['/login', '/401', '/404', '/register', '/nodo', '/testAudio']
