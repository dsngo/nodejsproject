const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
  const config = {
    entry: {
      // vendor: [resolve(__dirname, 'app/vendor')],
      app: resolve(__dirname, 'app/index.jsx'),
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: `js/[name]-bundle.js`,
      publicPath: '',
      pathinfo: true,
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: resolve(__dirname, 'app'),
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          include: resolve(__dirname, 'app/css'),
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'app/index.html'),
      }),
    ],
  };
  // Production config
  if (env.prod) {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        children: true,
        async: true,
        minChunk: 2,
      }),
      new BundleAnalyzerPlugin()
    );
    config.devtool = 'hidden-source-map';
    config.output.pathinfo = false;
  }
  // Development config
  if (env.dev) {
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        children: true,
        async: true,
        minChunk: 2,
      })
    );
  }
  return config;
};
