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
              '@shared': './src/shared',
              '@shared/*': './src/shared/*',
              '@config': './src/config',
              '@constants': './src/constants',
              '@contexts': './src/contexts',
              '@styles': './src/styles',
              // Roulette feature paths - specific first
              '@features/roulette-training': './src/features/roulette/roulette-training',
              '@features/roulette-game': './src/features/roulette/roulette-game',
              '@features/racetrack': './src/features/roulette/racetrack',
              '@features/racetrack-position-training': './src/features/roulette/racetrack-position-training',
              '@features/racetrack-sector-training': './src/features/roulette/racetrack-sector-training',
              '@features/roulette-knowledge-training': './src/features/roulette/roulette-knowledge-training',
              '@features': './src/features',
              '@utils': './src/utils',
              '@services': './src/services',
              '@hooks': './src/hooks',
              '@screens': './src/screens',
              '@navigation': './src/navigation',
              '@store': './src/store',
              '@': './src',
              '@test-utils': './src/test-utils',
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
            '@contexts': './src/contexts',
            '@styles': './src/styles',
            // Roulette feature paths - specific first
            '@features/roulette-training': './src/features/roulette/roulette-training',
            '@features/roulette-game': './src/features/roulette/roulette-game',
            '@features/racetrack': './src/features/roulette/racetrack',
            '@features/racetrack-position-training': './src/features/roulette/racetrack-position-training',
            '@features/racetrack-sector-training': './src/features/roulette/racetrack-sector-training',
            '@features/roulette-knowledge-training': './src/features/roulette/roulette-knowledge-training',
            '@features': './src/features',
            '@utils': './src/utils',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@': './src',
            '@test-utils': './src/test-utils',
          },
        },
      ],
    ],
  };
};
