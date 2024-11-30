// 外部可以通过docker映射进来一个配置文件，新的配置文件可以覆盖config中的配置信息
var externalSettings = {}
localStorage.externalSettings = JSON.stringify(externalSettings)
