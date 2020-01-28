var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'client/dist/'),
        filename: 'bundle.min.js',
        libraryTarget: 'umd'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              },
              {
                       test: /\.(woff|woff2|eot|ttf|otf)$/,
                         use: [
                           'file-loader',
                         ],
                       },
                       {
                        test: /\.(png|svg|jpg|gif)$/,
                        use: [
                          'file-loader',
                        ],
                      }
        ]
    },

     plugins: [
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("development") 
            }
        })
         
    ]
}
