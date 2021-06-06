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
                    Components: './src/Components',
                    Context: './src/Context',
                    Controllers: './src/Controllers',
                    Helpers: './src/Helpers',
                    Hooks: './src/Hooks',
                    Modules: './src/Modules',
                    Navigation: './src/Navigation',
                    Reducers: './src/Reducers',
                    Screens: './src/Screens',
                    Styles: './src/Styles',
                    Types: './src/Types',
                },
            },
        ],
        ['react-native-reanimated/plugin'],
    ],
};
