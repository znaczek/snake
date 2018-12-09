const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
    const mode = argv.mode;

    const config = {
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js' ]
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            inline: true,
            compress: true,
            port: 80,
            host: '0.0.0.0',
        }
    };

    if (mode === 'production') {
        config.mode = 'production';
    } else {
        config.mode = 'development';
        config.devtool = 'inline-source-map';
    }

    return config;
};
