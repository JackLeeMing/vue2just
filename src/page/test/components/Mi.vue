<template>
  <div class="mi-page">
    <div class="site-topbar">
      <div class="container clearfix">
        <div class="topbar-nav">
          <a rel="nofollow"
             href="//www.mi.com/">小米官网</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//www.mi.com/shop">小米商城</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//hyperos.mi.com/"
             target="_blank">小米澎湃OS</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//www.xiaomiev.com/"
             target="_blank">小米汽车</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//i.mi.com/"
             target="_blank">云服务</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//iot.mi.com"
             target="_blank">IoT</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//youpin.mi.com/"
             target="_blank">有品</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//xiaoai.mi.com/"
             target="_blank">小爱开放平台</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//www.mi.com/aptitude/list/?id=88"
             target="_blank">资质证照</a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="//www.mi.com/aptitude/list/"
             target="_blank">协议规则</a>
          <span class="sep">|</span>
          <a id="J_siteDownloadApp"
             rel="nofollow"
             href="//www.mi.com/appdownload/"
             target="_blank"
             class="topbar-download">
            下载app
            <span class="appcode">
              <img src="//i1.mifile.cn/f/i/17/appdownload/download.png?1"
                   alt="小米商城"
                   width="90"
                   height="90">
              小米商城APP
            </span></a>
          <span class="sep">|</span>
          <a rel="nofollow"
             href="javascript:;"
             class="J_siteGlobalRegion">Select Location</a>
        </div>
        <div class="topbar-cart"></div>
        <div class="topbar-info"></div>
      </div>
    </div>
    <div class="class-top-header">
      <a>Xiaomi手机</a>
      <a>Redmi手机</a>
      <a>电视</a>
      <a>笔记本</a>
      <a>平板</a>
      <a>家电</a>
      <a>路由器</a>
      <a>服务中心</a>
      <a>社区</a>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss">
.clearfix:after,
.clearfix:before {
  content: ' ';
  display: table;
}
.clearfix:after {
  clear: both;
}
</style>
<style lang="scss" scoped>
.mi-page {
  -webkit-text-size-adjust: 100%;
  min-width: 1226px;
  font: 14px / 1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei,
    sans-serif;
}
.site-topbar {
  position: relative;
  z-index: 30;
  height: 40px;
  font-size: 12px;
  color: #b0b0b0;
  background: #333;
  .container {
    width: 1226px;
    margin-left: auto;
    margin-right: auto;
  }
  .container .topbar-nav {
    float: left;
    height: 40px;
    line-height: 40px;
  }
  .container .topbar-cart {
    float: right;
    position: relative;
    width: 120px;
    height: 40px;
    margin-left: 15px;
    transition: all 0.2s;
    font-size: 12px;
  }
  .container .topbar-info {
    float: right;
    position: relative;
    height: 40px;
    line-height: 40px;
    min-width: 120px;
  }
  a {
    text-decoration: none;
    color: #b0b0b0;
    line-height: 40px;
    display: inline-block;
  }
  .sep {
    margin: 0 0.3em;
    color: #424242;
    font-family: sans-serif;
  }
}
.site-topbar .topbar-download .appcode {
  position: absolute;
  top: 40px;
  left: 50%;
  width: 124px;
  height: 0px;
  background: #fff;
  margin-left: -55px;
  box-shadow: 0 1px 5px #aaa;
  text-align: center;
  font-size: 14px;
  color: #333;
  line-height: 1;
  overflow: hidden;
  transition: height 0.3s;
}
.site-topbar .topbar-download img {
  display: block;
  margin: 18px auto 12px;
}
.topbar-download:hover {
  .appcode {
    height: 148px;
  }
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -8px;
    border-width: 0 8px 8px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #fff;
  }
}
.site-topbar .topbar-download.active .appcode {
  height: 148px;
}
.site-topbar a:hover {
  color: #fff;
  outline: 0;
  text-decoration: none;
}
</style>