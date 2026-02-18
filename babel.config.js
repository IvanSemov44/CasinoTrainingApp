/**
 * Babel configuration for Casino Training App
 * Exports different presets based on environment
 */
module.exports = function (api) {
  // Cache the configuration
  api.cache.using(() => process.env.NODE_ENV);

  const isTest = process.env.NODE_ENV === 'test';

  // For tests, use a minimal preset without reanimated plugin issues
  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
      plugins: [
        // Module resolver for path aliases
        [
          'module-resolver',
          {
            root: ['.'],
            extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
            alias: {
              '@app-types': './src/types',
              '@components': './src/components',
              '@config': './src/config',
              '@constants': './src/constants',
              '@features': './src/features',
              '@utils': './src/utils',
              '@services': './src/services',
              '@hooks': './src/hooks',
              '@screens': './src/screens',
              '@navigation': './src/navigation',
              '@store': './src/store',
              '@': './src',
            },
          },
        ],
      ],
    };
  }

  // For production/development, use the full preset
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@app-types': './src/types',
            '@components': './src/components',
            '@config': './src/config',
            '@constants': './src/constants',
            '@features': './src/features',
            '@utils': './src/utils',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@': './src',
          },
        },
      ],
    ],
  };
};
