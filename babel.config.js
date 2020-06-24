module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel']
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ["./"],
        alias: {
          "@components": "./src/components",
          "@nav": "./src/nav"
        }
      },
    ],
    ['babel-plugin-transform-inline-environment-variables']
  ]
};
