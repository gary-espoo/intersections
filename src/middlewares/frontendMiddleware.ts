/* eslint-disable global-require */
import { join } from 'path';
import webpack from 'webpack';
console.log(webpack)
console.log(join)

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    //const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    const webpackConfig = {
      entry: './src/index.js',
      output: {
          path:   join(__dirname, '..', 'client'),
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
                          presets: ['env']
                      }
                  }
              }
          ]
      },
  
       plugins: [
          new webpack.DefinePlugin({
              "process.env": { 
                  NODE_ENV: JSON.stringify("production") 
              }
          }),
          new webpack.optimize.UglifyJsPlugin({
              compress: {
                  warnings: false,
              },
              output: {
                  comments: false,
              },
          })
      ]
  }
  
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
