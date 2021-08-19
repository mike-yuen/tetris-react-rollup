const path = require('path');

module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    core: {
        builder: "webpack5",
    },
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-storysource"
    ],
    webpackFinal: async (config, { configType }) => {
        config.resolve = {
            ...(config.resolve || {}),
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                "@": path.resolve(__dirname, '../src')
            },
        }

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', { loader: 'sass-loader' }],
            include: path.resolve(__dirname, '../src'),
        }, {
            test: /\.mp3$/,
            use: [{ loader: 'file-loader' }],
            include: path.resolve(__dirname, '../src')
        });

        // Return the altered config
        return config;
    },
}