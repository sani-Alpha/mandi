module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
proxyTable: {
  "/api"[ 
    'http://localhost:3000'
  ]
}