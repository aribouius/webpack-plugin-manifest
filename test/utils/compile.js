import path from 'path'
import webpack from 'webpack'

export default (plugin, done) => {
  const config = {
    entry: {
      main: path.join(__dirname, 'entry')
    },
    output: {
      path: path.join(__dirname, '..', 'tmp'),
      filename: 'main.js',
      publicPath: '/assets/'
    },
    plugins: [
      plugin
    ]
  }
  return webpack(config, (error, stats) => {
    if (error) throw error
    const errors = stats.toJson().errors
    if (errors.length) throw new Error(errors[0])
    done()
  })
}
