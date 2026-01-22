module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@config': './src/config',
            '@app-types': './src/types',
            '@store': './src/store',
            '@components': './src/components',
            '@constants': './src/constants',
            '@features': './src/features',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
