const MapOptions = {
  qqmap(location, dname) {
    return `qqmap://map/routeplan?type=drive&tocoord=${location.lat},${location.lng}&to=${dname}&referer=webapp.baidu.openAPIApp`
  },
  baidumap(location, dname) {
    return `baidumap://map/direction?destination=latlng:${location.lat},${location.lng}|name:${dname}&mode=driving`
  },
  amapuri(location, dname) {
    return `amapuri://route/plan/?dlat=${location.lat}&dlon=${location.lng}&dname=${dname}&dev=0&t=0`
  }
}

export function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}
export default MapOptions
