const path = require('path');

module.exports = (env, argv) => {
    const mode = argv.mode;
    console.log(mode);
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
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            historyApiFallback: true,
            index: './src/index.html',
            compress: true,
            port: 9000
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
