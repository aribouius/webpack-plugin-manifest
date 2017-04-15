import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'

export default class AssetManifest {
  static defaults = {
    path: undefined,
    merge: false,
    fileName: 'webpack-manifest.json',
    extensions: ['.js', '.css'],
    prettyPrint: false
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

      const writeFile = data => {
        const content = JSON.stringify(data, null, opts.prettyPrint ? 2 : null)
        fs.writeFile(file, content, err => {
          if (err) throw err
          callback()
        })
      }

      mkdirp(dest, err => {
        if (opts.merge) {
          fs.readFile(file, 'utf8', (error, content) => {
            if (error) {
              writeFile(manifest)
            } else {
              const data = JSON.parse(content)
              writeFile({ ...data, ...manifest })
            }
          })
        } else {
          writeFile(manifest)
        }
      })
    })
  }
}
