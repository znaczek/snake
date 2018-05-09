const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const CSSExtract = new ExtractTextPlugin('style.css');

    const config = {
        entry: ['babel-polyfill', path.join(__dirname, 'src', 'app.js')],
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'app.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                        }
                    }
                }, {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [{
                            loader: 'css-loader',
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }, {
                            loader: 'sass-loader' // compiles Sass to CSS
                        }]
                    })
                }
            ]
        },
        plugins: [CSSExtract]
    };

    if (env.NODE_ENV === 'dev') {
        config.devtool = 'inline-source-map';
    }

    return config;
};
