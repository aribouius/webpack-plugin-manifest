import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const srcDir = path.join(__dirname, '..', 'files')
const outDir = path.join(__dirname, '..', 'tmp')

export default (plugin, done) => {
  const config = {
    devtool: 'source-map',
    entry: {
      main: path.join(srcDir, 'main'),
      vendor: path.join(srcDir, 'vendor')
    },
    output: {
      path: outDir,
      filename: '[name].js',
      publicPath: '/assets/'
    },
    plugins: [
      plugin,
      new ExtractTextPlugin('[name].css', { allChunks: true }),
      new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js')
    ],
    module: {
      loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
        { test: /\.jpg$/, loader: 'file-loader' }
      ]
    }
  }
  return webpack(config, (error, stats) => {
    if (error) throw error
    const errors = stats.toJson().errors
    if (errors.length) throw new Error(errors[0])
    done()
  })
}
