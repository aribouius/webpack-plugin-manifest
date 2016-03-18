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

  it('Uses a configured file name', function(done) {
    compile(new ManifestPlugin({ fileName: 'manifest.json' }), () => {
      expect(path.join(tmpDir, 'manifest.json')).to.be.a.file()
      done()
    })
  })

  it('Uses a configured output path', function(done) {
    const dir = path.join(tmpDir, 'custom')
    compile(new ManifestPlugin({ path: dir }), () => {
      expect(path.join(dir, 'webpack-manifest.json')).to.be.a.file()
      done()
    })
  })

  it('Uses chunk names for manifest keys', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.exist
      done()
    })
  })

  it('Prepends webpack output public path', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.equal('/assets/main.js')
      done()
    })
  })

  it('Supports multiple entry chunks', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['vendor.js']).to.exist
      done()
    })
  })

  it('Supports css bundles', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.css']).to.exist
      done()
    })
  })

  it('Ignores code split chunks', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['1.js']).to.not.exist
      done()
    })
  })

  it('Includes configured extensions', function(done) {
    compile(new ManifestPlugin({ extensions: ['.js'] }), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.exist
      done()
    })
  })

  it('Does not include unknown extensions', function(done) {
    compile(new ManifestPlugin({ extensions: ['.tmp'] }), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.not.exist
      done()
    })
  })
})
