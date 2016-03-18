# webpack-plugin-manifest
Webpack plugin for generating asset manifests.

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
- `path`: Where to save the manifest. Defaults to webpack output path.
- `fileName`: Name of the generated manifest file. Defaults to `webpack-manifest.json`.
- `extensions`: An array of allowed file extensions. Defaults to `['.js', '.css']`.
- `prettyPrint`: Whether to format the JSON output for readability. Defaults to false.

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
