# webpack-plugin-manifest
Webpack plugin for generating asset manifests.

## Features
Generates a JSON manifest file that maps chunk names to their corresponding output files.

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
- `path`: Where to save the manifest. Defaults to Webpack output path.
- `fileName`: Name of the generated manifest file. Defaults to `webpack-manifest.json`.
- `merge`: Indicates whether to merge with existing manifest. Defaults to `false`.
- `extensions`: An array of allowed file extensions. Defaults to `['.js', '.css']`.
- `prettyPrint`: Whether to format the JSON output for readability. Defaults to `false`.

### License
MIT
