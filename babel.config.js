module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel']
    }
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@data': './src/data',
          '@nav': './src/nav',
          '@services': './src/services',
          '@screens': './src/screens'
        }
      }
    ],
    ['babel-plugin-transform-inline-environment-variables'],
    ['import-graphql']
  ]
}
