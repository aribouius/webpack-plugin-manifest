require('./styles.css')

module.exports = function main() {
  require.ensure([], function(require) {
    require('./chunk')
  })
}
