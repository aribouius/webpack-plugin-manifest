import del from 'del'
import path from 'path'
import chai, { expect } from 'chai'
import compile from './utils/compile'
import ManifestPlugin from '../src'

chai.use(require('chai-fs'))
const tmpDir = path.join(__dirname, 'tmp')
const manifestFile = path.resolve(__dirname, 'tmp', 'webpack-manifest.json')

describe('ManifestPlugin', function() {
  afterEach(function(done) {
    del([tmpDir]).then(() => {
      delete require.cache[manifestFile]
      done()
    })
  })

  it('Creates a manifest', function(done) {
    compile(new ManifestPlugin(), () => {
      expect(manifestFile).to.be.a.file()
      done()
    })
  })

  it('Accepts a custom file name', function(done) {
    compile(new ManifestPlugin({ fileName: 'manifest.json' }), () => {
      expect(path.join(tmpDir, 'manifest.json')).to.be.a.file()
      done()
    })
  })

  it('Accepts a custom output path', function(done) {
    const dir = path.join(tmpDir, 'custom')
    compile(new ManifestPlugin({ path: dir }), () => {
      expect(path.join(dir, 'webpack-manifest.json')).to.be.a.file()
      done()
    })
  })

  it('Maps file names to file paths', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.equal('/assets/main.js')
      done()
    })
  })
})
