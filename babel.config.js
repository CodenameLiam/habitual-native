module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: [
                    '.ios.ts',
                    '.android.ts',
                    '.ts',
                    '.ios.tsx',
                    '.android.tsx',
                    '.tsx',
                    '.jsx',
                    '.js',
                    '.json',
                ],
                alias: {
                    Navigation: './src/Navigation',
                    Components: './src/Components',
                    Context: './src/Context',
                    Screens: './src/Screens',
                    Controllers: './src/Controllers',
                    Styles: './src/Styles',
                    Helpers: './src/Helpers',
                    Hooks: './src/Hooks',
                    Reducers: './src/Reducers',
                    Types: './src/Types',
                },
            },
        ],
        ['react-native-reanimated/plugin'],
    ],
};
