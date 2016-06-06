import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.babel';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  proxy: {
    '/api/*': {
      target: 'http://192.168.50.4',
      secure: false
    }
  }
}).listen(8080, 'localhost', function(error) {
  if (error) {
    console.log(error);
  }

  console.log('Listening at localhost:8080');
});
