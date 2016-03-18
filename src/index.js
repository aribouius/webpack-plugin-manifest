import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'

export default class AssetManifest {
  static defaults = {
    path: undefined,
    fileName: 'webpack-manifest.json',
    extensions: ['.js', '.css'],
    prettyPrint: true
  }

  constructor(options) {
    this.options = { ...AssetManifest.defaults, ...options }
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const opts = this.options
      const conf = compilation.options
      const base = conf.output.publicPath || ''
      const regx = new RegExp(`(?:${opts.extensions.join('|')})$`)
      const manifest = {}

      compilation.chunks.forEach(chunk => {
        if (!chunk.name) return
        chunk.files.forEach(file => {
          if (!regx.test(file)) return
          const exts = file.split('.').slice(1).join('.')
          manifest[`${chunk.name}.${exts}`] = base + file
        })
      })

      const dest = opts.path || conf.output.path
      const file = path.join(dest, opts.fileName)
      const data = JSON.stringify(manifest, null, opts.prettyPrint ? 2 : null)

      mkdirp(dest, err => {
        if (err) throw err
        fs.writeFile(file, data, error => {
          if (error) throw error
          callback()
        })
      })
    })
  }
}
