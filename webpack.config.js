const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = env => {
  const config = {
    entry: {
      app: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:9090',
        'webpack/hot/only-dev-server',
        resolve(__dirname, 'app/index.jsx'),
      ],
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: `assets/js/[name]-bundle.js`,
      publicPath: '',
      pathinfo: true,
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      hot: true,
      port: 9090,
      historyApiFallback: true,
      // publicPath: '/dist/',
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx'],
    },
    stats: {
      colors: true,
      reasons: true,
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
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'app/index.html'),
      }),
    ],
  };
  // Production configurations
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
    config.stats.chunks = false;
    config.entry.app = resolve(__dirname, 'app/index.jsx');
    delete config.devServer;
  }
  // Development configurations
  if (env.dev) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
  }
  return config;
};
