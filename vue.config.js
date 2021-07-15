module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-consultation/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
