import fs from 'fs'
import del from 'del'
import path from 'path'
import mkdirp from 'mkdirp'
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

  it('creates a manifest', function(done) {
    compile(new ManifestPlugin(), () => {
      expect(manifestFile).to.be.a.file()
      done()
    })
  })

  it('uses a configured file name', function(done) {
    compile(new ManifestPlugin({ fileName: 'manifest.json' }), () => {
      expect(path.join(tmpDir, 'manifest.json')).to.be.a.file()
      done()
    })
  })

  it('uses a configured output path', function(done) {
    const dir = path.join(tmpDir, 'custom')
    compile(new ManifestPlugin({ path: dir }), () => {
      expect(path.join(dir, 'webpack-manifest.json')).to.be.a.file()
      done()
    })
  })

  it('uses chunk names for manifest keys', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.exist
      done()
    })
  })

  it('prepends webpack output public path', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.equal('/assets/main.js')
      done()
    })
  })

  it('supports multiple entry chunks', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['vendor.js']).to.exist
      done()
    })
  })

  it('supports css bundles', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.css']).to.exist
      done()
    })
  })

  it('ignores code split chunks', function(done) {
    compile(new ManifestPlugin(), () => {
      const manifest = require(manifestFile)
      expect(manifest['1.js']).to.not.exist
      done()
    })
  })

  it('includes configured extensions', function(done) {
    compile(new ManifestPlugin({ extensions: ['.js'] }), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.exist
      done()
    })
  })

  it('does not include unknown extensions', function(done) {
    compile(new ManifestPlugin({ extensions: ['.tmp'] }), () => {
      const manifest = require(manifestFile)
      expect(manifest['main.js']).to.not.exist
      done()
    })
  })

  it('overwrites existing manifest by default', function(done) {
    const data = { 'foo.js': '/foo.js', 'main.js': '/main.js' }
    mkdirp(tmpDir, err => {
      fs.writeFile(manifestFile, data, error => {
        if (error) throw error
        compile(new ManifestPlugin(), () => {
          const manifest = require(manifestFile)
          expect(manifest['main.js']).to.equal('/assets/main.js')
          expect(manifest['foo.js']).to.equal(undefined)
          done()
        })
      })
    })
  })

  it('optionally merges with existing manifest', function(done) {
    const data = { 'foo.js': '/foo.js', 'main.js': '/main.js' }
    mkdirp(tmpDir, err => {
      fs.writeFile(manifestFile, JSON.stringify(data), error => {
        if (error) throw error
        compile(new ManifestPlugin({ merge: true }), () => {
          const manifest = require(manifestFile)
          expect(manifest['main.js']).to.equal('/assets/main.js')
          expect(manifest['foo.js']).to.equal('/foo.js')
          done()
        })
      })
    })
  })

  it('does not require an existing manifest file when merge option is enabled', function(done) {
    compile(new ManifestPlugin({ merge: true }), () => {
      expect(manifestFile).to.be.a.file()
      done()
    })
  })
})
