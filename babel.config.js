module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    [
      'import',
      {
        libraryName: 'mand-mobile',
        libraryDirectory: 'lib'
      },
      'mand-mobile'
    ],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        // style: true
        style: name => `${name}/style/less`
      },
      'vant'
    ]
  ]
}
