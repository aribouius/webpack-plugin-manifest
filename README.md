# webpack-plugin-manifest

## Installation
```bash
$ npm i --save webpack-plugin-manifest
```

## Usage
Add new plugin instance to your `webpack` config
```javascript
  import ManifestPlugin from 'webpack-plugin-manifest'

  const compiler = webpack({
    // ...
    plugins: [
      new ManifestPlugin()
    ]
  })
```

## Configuration
The plugin accepts the following options:
- `path`: The absolute path to the manifest file directory.
- `fileName`: The name of the generated manifest file.
- `extensions`: An array of allowed file extensions.

### Scripts
* `npm run compile` - Compiles source files to disk (~/lib).
* `npm run compile:watch` - Same as `npm run compile` but watches files for changes.
* `npm run lint` - Lints source and test files.
* `npm run lint:fix` - Lints files and attempts to fix any issues.
* `npm run test` - Runs unit tests.
* `npm run test:watch` - Same as `npm test` but watches files for changes.
* `npm run test:cov` - Generates a test coverage report.

### Distribution
Execute one of the following commands
```bash
npm version patch -m "Bump to %s"
npm version minor -m "Bump to %s"
npm version major -m "Bump to %s"
```
### License
MIT
