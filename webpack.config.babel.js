import path from 'path';

import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import nesting from 'postcss-nesting';
import calc from 'postcss-calc';
import customProperties from 'postcss-custom-properties';
import colorFn from 'postcss-color-function';
import values from 'postcss-modules-values';
import autoprefixer from 'autoprefixer';
import flexibility from 'postcss-flexibility';

import pkg from './package.json';

const ENV = process.env.NODE_ENV;
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  fuselink: path.join(__dirname, 'src/libs/fuselink')
};

let webpackConf = {};
let common = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/index'
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      fuselink: PATHS.fuselink
    },
    modulesDirectories: [
      __dirname,
      'node_modules',
      PATHS.src
    ],
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        loaders: ['babel-loader'],
        include: PATHS.src
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: PATHS.src
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url-loader?limit=10000'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]',
          'postcss-loader',
          'sass-loader'
        ],
        include: PATHS.src
      }
    ]
  },
  postcss() {
    return [
      flexibility,
      autoprefixer({ browsers: ['last 2 versions'] })
    ];
  },
  node: {
    fs: 'empty'
  }
};

if (ENV === 'development') {
  webpackConf = {
    ...common
  };
}
else if (ENV === 'production') {
  webpackConf = {
    ...common,

    entry: {
      index: './src/index',
      vendor: Object.keys(pkg.dependencies)
    },

    output: {
      path: PATHS.build,
      filename: '[name].js',
      chunkFilename: '[chunkhash].js'
    },

    loaders: common.module.loaders.map(function(loader) {
      if (loader.loaders.indexOf('style-loader') !== -1) {
        loader.loader = ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!postcss-loader!sass-loader'
        );
      }
      return loader;
    }),
    plugins: [
      new CleanPlugin([PATHS.build]),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
  };
}
else if (ENV === 'test') {
  webpackConf = {
    ...common,

    // babel-plugin-webpack-loaders requirements
    entry: undefined,
    devtool: '',
    output: {
      libraryTarget: 'commonjs2'
    },
    loaders: common.module.loaders.filter(function(loader) {
      return loader.loaders.indexOf('babel-loader') === -1;
    })
  };
}


export default webpackConf;
